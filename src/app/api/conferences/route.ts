import { NextResponse } from 'next/server';
import { prisma } from '@/utils/prisma';

export async function GET() {
  try {
    const confs = await prisma.conference.findMany();
    // (Optional) console.log(confs);
    return NextResponse.json(confs);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


//mainly for the admin page
export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Generate a unique ID (using crypto.randomUUID)
    const id = crypto.randomUUID();
    
    // Create the conference
    const result = await prisma.conference.create({
      data: {
        id,
        name: data.name,
        description: data.description || "",
        date: data.date,
        location: data.location,
        price: data.price || 0,
        category: JSON.stringify(data.category || ["General"]),
        imageUrl: data.imageUrl || null,
        maxAttendees: data.maxAttendees || 100,
        currentAttendees: data.currentAttendees || 0,
        isFeatured: data.isFeatured || false,
        status: data.status || "Open",
      }
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}