import cookie from 'cookie';
import { Http2ServerRequest } from 'http2';

export const parseCookies = (req: Http2ServerRequest) => {
  return cookie.parse(req ? req.headers.cookie || '' : '');
};
