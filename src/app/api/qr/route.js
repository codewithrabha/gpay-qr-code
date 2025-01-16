import { NextResponse } from 'next/server';

export async function POST(req) {
  const { pa, pn, am, cu } = await req.json(); // Read data from the body

  // Validate the amount
  if (!am || isNaN(am) || am <= 0) {
    return NextResponse.json(
      { error: 'Please provide a valid amount!' },
      { status: 400 }
    );
  }

  // Construct the API URL
  const apiUrl = `${process.env.NEXT_PUBLIC_QR_API_BASE_URL}?size=225x225&data=${encodeURIComponent(
    `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=${cu}`
  )}`;

  // Return the QR code URL in the response
  return NextResponse.json({ apiUrl }, { status: 200 });
}
