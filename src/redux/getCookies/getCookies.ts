/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable func-names */

type CookieType = Record<string, string>;
export const getCookies = function (): CookieType {
  let pairs = document.cookie.split(';');
  let cookies: CookieType = {};
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
};
