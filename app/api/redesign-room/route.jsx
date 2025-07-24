/*convert image to ai image
convert output url ro BASE64 image
save BASE64 to supabase
save all to the database*/
import dotenv from 'dotenv';
dotenv.config();
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const apiKey = process.env.PERSONAL_AI_API_KEY;

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 3000; // 3 seconds

async function fetchAIImageWithRetry(payload, retries = MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    const aiResponse = await fetch("https://ai-api.kandregulasujith.workers.dev/images/transform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey 
      },
      body: JSON.stringify(payload)
    });

    const result = await aiResponse.json();

    if (result.success && result.data?.url) {
      return result;
    }

    if (result.error?.code === "TRANSFORMATION_ERROR") {
      console.warn(`⚠️ Retry ${i + 1}/${retries} - AI API over capacity`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
      continue;
    }

    throw new Error(`AI API failed: ${JSON.stringify(result)}`);
  }

  throw new Error("AI API failed after retries due to capacity issues.");
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("✅ Incoming request:", body);

    const { imageUrl, roomType, designType, requirements } = body;

    if (!imageUrl || !roomType || !designType || !requirements) {
      throw new Error("Missing one or more required fields.");
    }

    // Step 1: Fetch image and convert to base64
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error("Failed to fetch image from Supabase");

    const arrayBuffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString("base64");

    // Step 2: Prepare AI API prompt
    const prompt = `Transform this ${roomType} into a ${designType} style. Additional instructions: ${requirements}`;
    const aiPayload = {
      inputImageBase64: base64Image,
      prompt,
      width: 512,
      height: 512,
      steps: 20,
      guidance: 7.5
    };

    // Step 3: Call AI API with retry
    const aiResult = await fetchAIImageWithRetry(aiPayload);
    console.log("✅ AI image transformation successful:", aiResult.data.url);

    // Step 4: Convert output image URL to base64
    const transformedImgResponse = await fetch(aiResult.data.url);
    const transformedBuffer = Buffer.from(await transformedImgResponse.arrayBuffer());

    // Step 5: Upload final image to Supabase
    const filename = `generated/${Date.now()}.png`;
    const { error: uploadError } = await supabase.storage
      .from("images")
      .upload(filename, transformedBuffer, {
        contentType: "image/png",
        cacheControl: "3600",
      });

    if (uploadError) throw uploadError;

    // Step 6: Get public URL
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("images")
      .getPublicUrl(filename);

    if (publicUrlError || !publicUrlData?.publicUrl) {
      throw new Error("Failed to retrieve public URL from Supabase.");
    }

    console.log("✅ Upload complete. Public URL:", publicUrlData.publicUrl);
    return NextResponse.json({ url: publicUrlData.publicUrl });

  } catch (err) {
    console.error("❌ Error in redesign-room:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
