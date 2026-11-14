import { logout } from "@/lib/api/auth";
import { errorResponse, passthrough, upstreamHeaders } from "@/lib/api/route";

export async function POST(req: Request) {
  try {
    const upstream = await logout(upstreamHeaders(req));
    return passthrough(upstream);
  } catch (e) {
    return errorResponse(e);
  }
}
