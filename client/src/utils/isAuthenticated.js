import jwt_decode from "jwt-decode";

const useIsAuthenticated = () => {
  const allCookies = document.cookie;

  const cookie = allCookies
    .split(";")
    .filter((cookie) => cookie.startsWith("access_token="))
    .join("");

  const token = cookie.split("=")[1];

  if (!token) return false;

  const { iat } = jwt_decode(token);

  const expirationDate = new Date(iat * 1000 + 24 * 60 * 60 * 1000).getTime();
  const currentDate = new Date(Date.now()).getTime();

  if (expirationDate < currentDate) return false;

  return true;
};

export default useIsAuthenticated;
