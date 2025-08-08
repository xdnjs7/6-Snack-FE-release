import { NextResponse } from "next/server";

// request: NextRequest
export function middleware() {
  return NextResponse.next();
}
