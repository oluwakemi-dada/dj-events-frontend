import cookie from 'cookie';
import { Http2ServerRequest } from 'http2';

export function parseCookies(req: Http2ServerRequest) {
  return cookie.parse(req ? req.headers.cookie || '' : '');
}
