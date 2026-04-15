import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth-middleware";

export async function GET(request: NextRequest) {
  const auth = getAuthFromRequest(request);
  if (!auth || auth.role !== "seller") {
    return NextResponse.json([], { status: 200 });
  }

  const rows = await sql`
    SELECT id, name, price, description, category, image_url
    FROM products
    WHERE seller_id = ${auth.userId}
    ORDER BY created_at DESC
  `;

  return NextResponse.json(rows);
}

export async function POST(request: NextRequest) {
  const auth = getAuthFromRequest(request);
  if (!auth || auth.role !== "seller") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { name, price, description, category, image_url } = body;

  // Required fields
  if (!name || !name.trim()) {
    return NextResponse.json(
      { error: "Product name is required" },
      { status: 400 }
    );
  }

  if (!price || Number(price) <= 0) {
    return NextResponse.json(
      { error: "Price must be a positive number" },
      { status: 400 }
    );
  }

  if (!category) {
    return NextResponse.json(
      { error: "Category is required" },
      { status: 400 }
    );
  }


  if (
    image_url &&
    image_url.trim() !== "" &&
    !image_url.startsWith("/") &&
    !image_url.startsWith("http")
  ) {
    return NextResponse.json(
      {
        error:
          "Image URL must start with '/' for local images or 'http' for external images",
      },
      { status: 400 }
    );
  }

  await sql`
    INSERT INTO products (name, price, description, category, image_url, seller_id)
    VALUES (
      ${name},
      ${price},
      ${description || null},
      ${category},
      ${image_url && image_url.trim() !== "" ? image_url : "/images/placeholder.jpg"},
      ${auth.userId}
    )
  `;

  return NextResponse.json({ ok: true });
}
