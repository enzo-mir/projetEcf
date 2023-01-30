const Connect = ({ isConnected, isAdmin }) => {
  /* Si  la session localStorage userLogin existe*/
  if (
    window.localStorage.getItem("adminLogin") ||
    window.localStorage.getItem("userLogin")
  ) {
    return window.localStorage.getItem("adminLogin")
      ? isAdmin(true)
      : typeof window.localStorage.getItem("userLogin") === "string"
      ? isConnected(true)
      : isConnected(false);
  }
};
export let userData =
  typeof window.localStorage.getItem("userLogin") === "string"
    ? JSON.parse(window.localStorage.getItem("userLogin"))[0]
    : null;
export default Connect;
