export default async function postConnection(
  nom,
  email,
  mdp,
  convives,
  alergies
) {
  let postConnection = fetch("/connectReq", {
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
  let postRes = postConnection.then((res) => res.json()).then(async (data) => await data);
  return postRes
}
