import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json({ error: "No file provided" }, { status: 400 });
		}

		// Convert file to base64
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const base64File = buffer.toString("base64");
		const dataURI = `data:${file.type};base64,${base64File}`;

		// Upload to Cloudinary in the Portfolio folder
		const result = await cloudinary.uploader.upload(dataURI, {
			folder: "Portfolio",
			resource_type: "auto",
			allowed_formats: ["jpg", "png", "gif", "webp", "svg"],
			transformation: [{ quality: "auto:best" }, { fetch_format: "auto" }],
		});

		return NextResponse.json({
			url: result.secure_url,
			public_id: result.public_id,
		});
	} catch (error) {
		console.error("Upload error:", error);
		return NextResponse.json({ error: "Upload failed" }, { status: 500 });
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
