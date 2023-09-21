const isAuthenticated = () => {
  const allCookies = document.cookie;
  console.log(allCookies);
  const cookie = allCookies
    .split(";")
    .filter((cookie) => cookie.startsWith("access_token="))
    .join("");
  const expirationDate = new Date(cookie.split("=")[1]);
  return cookie;
};

export default isAuthenticated;
