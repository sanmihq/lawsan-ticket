import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

export async function POST(req: NextRequest, res: NextResponse) {
  const { title, firstName, lastName, matricNumber, email } = await req.json();

  try {
    console.log("Received request:", {
      title,
      firstName,
      lastName,
      matricNumber,
      email,
    });

    // Check for existing guest by matric number
    let { data: guest, error } = await supabase
      .from("guests")
      .select("*")
      .eq("matric_number", matricNumber)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking existing guest:", error);
      return NextResponse.json(
        { message: "Error checking existing guest" },
        { status: 500 }
      );
    }

    if (!guest) {
      const { data: existingGuests, error: fetchError } = await supabase
        .from("guests")
        .select("seat")
        .order("created_at", { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error("Error fetching guests:", fetchError);
        return NextResponse.json(
          { message: "Error fetching guests" },
          { status: 500 }
        );
      }

      let seatSide = "Bride"; // Default to Bride side
      if (existingGuests && existingGuests.length > 0) {
        const lastGuestSeat = existingGuests[0].seat;
        seatSide = lastGuestSeat === "Bride" ? "Groom" : "Bride"; // Alternate sides
      }

      const { data: newGuest, error: insertError } = await supabase
        .from("guests")
        .insert([
          {
            title,
            first_name: firstName,
            last_name: lastName,
            matric_number: matricNumber,
            email,
            seat: seatSide,
          },
        ])
        .single();

      if (insertError) {
        console.error("Error inserting new guest:", insertError);
        return NextResponse.json(
          { message: "Error inserting new guest" },
          { status: 500 }
        );
      }

      guest = newGuest;
    }

    const resPayload = { seat: guest.seat.split(" ")[0] };

    return new NextResponse(JSON.stringify(resPayload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Unhandled server error:", error);
    return new NextResponse(JSON.stringify({ message: "Server error" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
