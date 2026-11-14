import { getMe } from "@/lib/api/auth";
import { errorResponse, passthrough, upstreamHeaders } from "@/lib/api/route";

export async function GET(req: Request) {
  try {
    const upstream = await getMe(upstreamHeaders(req));
    return passthrough(upstream);
  } catch (e) {
    return errorResponse(e);
  }
}
