import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm"; 

export async function POST(req) {
    try {
        const body = await req.json();
        console.log("Request body:", body);

        if (!body.user || !body.user.primaryEmailAddress?.emailAddress) {
            console.error("Invalid user data:", body);
            return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
        }

        const user = body.user; 

        const userInfo = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user.primaryEmailAddress.emailAddress)); 

        console.log("User found in DB:", userInfo);

        if (userInfo?.length === 0) {
            const saveResult = await db.insert(Users)
                .values({
                    name: user?.fullName || "Unknown",
                    email: user?.primaryEmailAddress?.emailAddress,
                    imageUrl: user?.imageUrl,
                })
                .returning({ Users });

            return NextResponse.json({ result: saveResult[0].Users });
        }

        return NextResponse.json({ result: userInfo[0] });
    } 
    catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
    }
}
