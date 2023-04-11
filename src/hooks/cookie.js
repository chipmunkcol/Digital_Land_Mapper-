import { Cookies } from 'react-cookie'

const cookies = new Cookies();

export const setCookie = (value) => {
  return cookies.set('refresh_token', value, {
    // path: "/",
    // secure: true,
    // sameSite: "strict"
  });
}

export const getCookie = () => {
  return cookies.get('refresh_token');
}

export const removeCookie = () => {
  return cookies.remove('refresh_token', {
    // path: "/",
    // secure: true,
    // sameSite: "strict"
  })
}