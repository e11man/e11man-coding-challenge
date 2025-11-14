import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// Get single conference with speakers
export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "Conference ID is required." }, { status: 400 });
  }

  try {
    const conference = await prisma.conference.findUnique({
      where: { id },
      include: {
        speakers: {
          include: {
            speaker: true
          }
        }
      }
    });

    if (!conference) {
      return NextResponse.json({ error: "Conference not found." }, { status: 404 });
    }

    // Format the response to match the Conference type
    const speakers = conference.speakers.map(cs => cs.speaker);
    const categories = typeof conference.category === 'string' 
      ? JSON.parse(conference.category) 
      : conference.category || [];

    return NextResponse.json({
      ...conference,
      category: categories,
      speakers: speakers
    });
  } catch (error) {
    console.error("GET /api/conferences/[id] error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch conference." },
      { status: 500 }
    );
  }
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

// put method for admin edit of exisitng data
export async function PUT(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const data = await _request.json();
  
  const result = await prisma.conference.update({
    where: { id },
    data: {
      name: data.name,
      date: data.date,
      location: data.location,
      description: data.description || "",
      price: data.price || 0,
      category: JSON.stringify(data.category || ["General"]),
      status: data.status || "Open",
    }
  });
  
  return NextResponse.json(result);
}