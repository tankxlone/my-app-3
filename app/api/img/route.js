import path from "path";
import { NextResponse } from "next/server";
import fs from "fs/promises";


export async function POST(req) {
    try {
        // Use multer to process the file upload
        const data = await req.formData();
        const file = data.get("image");

        // Check if req.file is defined
        if (!file) {
            console.error("No file uploaded with the request");
            return NextResponse.json(
                { error: "No file uploaded with the request" },
                { status: 400 }
            );
        }
        const uploadDirectory = path.resolve("./public/uploads");

        await fs.mkdir(uploadDirectory, { recursive: true });

        const destinationPath = path.join(uploadDirectory, file.name);

        await fs.writeFile(destinationPath, Buffer.from(await file.arrayBuffer()))

        const imageUrl = `/uploads/${file.name}`;

        return NextResponse.json({ imageUrl }, { status: 200 });
    } catch (error) {
        console.error("Error handling file upload:", error);
        return NextResponse.json(
            { error: "Error handling file upload", details: (error).message },
            { status: 500 }
        );
    }
}