import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { getAuthFromRequest } from "@/lib/auth-middleware";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(request);
  if (!auth || auth.role !== "seller") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  const rows = await sql`
    SELECT id, name, price, description, category, image_url
    FROM products
    WHERE id = ${id} AND seller_id = ${auth.userId}
    LIMIT 1
  `;

  if (rows.length === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(request);
  if (!auth || auth.role !== "seller") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
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
    UPDATE products
    SET
      name = ${name},
      price = ${price},
      description = ${description || null},
      category = ${category},
      image_url = ${
        image_url && image_url.trim() !== ""
          ? image_url
          : "/images/placeholder.jpg"
      }
    WHERE id = ${id} AND seller_id = ${auth.userId}
  `;

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const auth = getAuthFromRequest(request);
  if (!auth || auth.role !== "seller") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await sql`
    DELETE FROM products
    WHERE id = ${id} AND seller_id = ${auth.userId}
  `;

  return NextResponse.json({ ok: true });
}
