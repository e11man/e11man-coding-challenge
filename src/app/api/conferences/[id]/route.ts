import { NextResponse } from "next/server";

import { prisma } from "@/utils/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Conference ID is required." }, { status: 400 });
  }

  try {
    await prisma.conference.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/conferences/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete conference." },
      { status: 500 }
    );
  }
}

