const Connect = ({ isConnected }) => {
  /* Si  la session localStorage userLogin existe*/
  return typeof window.localStorage.getItem("userLogin") === "string"
    ? isConnected(true)
    : isConnected(false);
};

export let userData =
  typeof window.localStorage.getItem("userLogin") === "string"
    ? JSON.parse(window.localStorage.getItem("userLogin"))[0]
    : null;

export default Connect;
