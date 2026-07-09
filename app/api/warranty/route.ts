import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (!process.env.GOOGLE_SCRIPT_URL) {
      return NextResponse.json(
        { error: 'System architecture setup error: script mapping misconfigured.' },
        { status: 500 }
      );
    }

    // =====================================================================
    // ROUTE 1: DUPLICATE WARRANTY CHECK ROUTER
    // =====================================================================
    if (action === "check_duplicate") {
      if (!body.warrantyNo) {
        return NextResponse.json({ error: 'Warranty Number missing.' }, { status: 400 });
      }

      const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: "check_duplicate", warrantyNo: body.warrantyNo }),
      });
      
      // 🛡️ BUGS FIX: Safely parse Google's response to avoid 500 Crash
      const textResponse = await res.text();
      try {
        const data = JSON.parse(textResponse);
        return NextResponse.json(data, { status: 200 });
      } catch (error) {
        return NextResponse.json({ 
          status: "error", 
          exists: true, 
          message: "Duplicate entry found or server connection failed." 
        }, { status: 200 });
      }
    }

    // =====================================================================
    // ROUTE 2: FULL REGISTRATION & SECURE TRANSLATION FORWARDER
    // =====================================================================
    if (action === "register_warranty") {
      
      // 💡 FIX 1: Frontend se aane wale 'baseUrl' ko extract kiya
      const { name, phone, email, warrantyNo, vehicleNumber, vehicleName, city, dealerName, dealerLocation, invoiceFile, vehicleFile, baseUrl } = body;

      // Tight server side parameters checking to avoid payload crashes
      if (!name || !phone || !email || !warrantyNo || !vehicleNumber || !vehicleName || !city || !dealerName || !dealerLocation || !invoiceFile || !vehicleFile) {
        return NextResponse.json({ error: 'Missing mandatory registration properties.' }, { status: 400 });
      }

      const res = await fetch(process.env.GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "register_warranty",
          name,
          mobile: phone, 
          email,
          warrantyNo,
          vehicleNumber,
          vehicleName,
          city,
          dealerName,
          dealerLocation,
          invoiceFile,
          vehicleFile,
          baseUrl // 💡 FIX 2: baseUrl ko Google Apps Script tak bhej diya!
        }),
      });

      const textResponse = await res.text();
      
      try {
        const data = JSON.parse(textResponse);
        if (data.status === "success" || data.status === 200) {
          return NextResponse.json(data, { status: 200 });
        } else {
          return NextResponse.json({ error: data.message || 'Error processing cloud records' }, { status: 500 });
        }
      } catch (parseError) {
        return NextResponse.json({ error: 'Failed to process Google Cloud response.' }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Bad Routing Directive' }, { status: 400 });

  } catch (error) {
    console.error("Next Gateway infrastructure crash logged:", error);
    return NextResponse.json({ error: 'Internal Server Error Processing Transaction' }, { status: 500 });
  }
}