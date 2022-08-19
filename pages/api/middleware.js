import Cookies from 'js-cookie';
import { APP_NAME } from '../../config';

const token_cookie_name = APP_NAME + ".user.token";
const profile_cookie_name = APP_NAME + ".user.profile";

export const middleware = (path) => {
  if (Cookies.get(token_cookie_name) && Cookies.get(profile_cookie_name)) {
    if (path == "login") {
      return "/";
    }

    return false;
  } else {
    if (path == "login") {
      return false;
    }

    return "/login";
  }
};

export const blacklist = () => {
  Cookies.remove(token_cookie_name);
  Cookies.remove(profile_cookie_name);
  window.location.href = "/login";
};
