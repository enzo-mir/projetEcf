export default async function postCreateAccount(
  nom,
  email,
  mdp,
  convives,
  alergies
) {
  let postAccount = fetch("/connectReq", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      nom: nom,
      email: email,
      mdp: mdp,
      convives: convives,
      alergies: alergies,
    }),
  });
  let postRes = postAccount
    .then((res) => res.json())
    .then(async (data) => await data);
  return postRes;
}
