/*convert image to ai image
convert output url ro BASE64 image
save BASE64 to supabase
save all to the database*/
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

// Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Gemini

const genAI = new GoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});


export async function POST(req) {
  try {
    const body = await req.json();
    console.log("✅ Incoming request:", body);

    const { imageUrl, roomType, designType, requirements } = body;

    if (!imageUrl || !roomType || !designType || !requirements) {
      throw new Error("Missing one or more required fields.");
    }

    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Failed to fetch image from Supabase");

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");


    const prompt = `Convert this into a ${designType} ${roomType}. Requirements: ${requirements}`;

    const model = genAI.getGenerativeModel({
      model: "gemini-pro-vision",
    });

    const result = await model.generateContent({
      contents: [
        { text: prompt },
        {
          inlineData: {
            mimeType: "image/png",
            data: base64Image,
          },
        },
      ],
      generationConfig: {
        response_mime_type: "image/png",
      },
    });

    const generatedImagePart = result?.response?.candidates?.[0]?.content?.parts?.find(
      (part) => part.inlineData
    );

    if (!generatedImagePart) throw new Error("Gemini did not return an image.");

    const generatedBase64 = generatedImagePart.inlineData.data;
    const generatedBuffer = Buffer.from(generatedBase64, "base64");

    // Step 3: Upload to Supabase
    const filename = `generated/${Date.now()}.png`;
    const { error: uploadError, data } = await supabase.storage
      .from("images")
      .upload(filename, generatedBuffer, {
        contentType: "image/png",
        cacheControl: "3600",
      });

    if (uploadError) {
      console.error("❌ Supabase upload error:", uploadError);
      throw uploadError;
    }

    const { publicUrl } = supabase.storage.from("images").getPublicUrl(filename);
    console.log("✅ Upload complete. Public URL:", publicUrl);

    return NextResponse.json({ url: publicUrl });

  } catch (err) {
    console.error("❌ Error in redesign-room:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
