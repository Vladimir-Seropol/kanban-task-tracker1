type CookieType = {
  auth_token: string;
};
export const getCookies = function () {
  let pairs = document.cookie.split(';');
  let cookies: CookieType = { auth_token: '' };
  for (let i = 0; i < pairs.length; i++) {
    let pair = pairs[i].split('=');
    cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('='));
  }
  return cookies;
};
