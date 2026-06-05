import { NextResponse } from "next/server";

interface BookingPayload {
  fullName: string;
  phone: string;
  carModel: string;
  product: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

const requiredFields: Array<keyof BookingPayload> = [
  "fullName",
  "phone",
  "carModel",
  "product",
  "preferredDate",
  "preferredTime"
];

function cleanString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const appScriptUrl = process.env.APPSCRIPT_API;

  if (!appScriptUrl) {
    return NextResponse.json(
      { error: "Booking service is not configured." },
      { status: 500 }
    );
  }

  let body: Partial<BookingPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid booking data." }, { status: 400 });
  }

  const booking: BookingPayload = {
    fullName: cleanString(body.fullName),
    phone: cleanString(body.phone),
    carModel: cleanString(body.carModel),
    product: cleanString(body.product),
    preferredDate: cleanString(body.preferredDate),
    preferredTime: cleanString(body.preferredTime),
    notes: cleanString(body.notes)
  };

  const missingField = requiredFields.find((field) => !booking[field]);

  if (missingField) {
    return NextResponse.json(
      { error: "Please fill all required fields." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(appScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...booking,
        submittedAt: new Date().toISOString(),
        source: "durashield-booking-form"
      })
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error("Apps Script booking failed", {
        status: response.status,
        statusText: response.statusText,
        body: responseText.slice(0, 500)
      });

      return NextResponse.json(
        {
          error: "Could not save booking right now. Check Apps Script deployment and sheet setup.",
          details: responseText
        },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Apps Script booking request failed", error);

    return NextResponse.json(
      { error: "Could not reach booking service." },
      { status: 502 }
    );
  }
}
