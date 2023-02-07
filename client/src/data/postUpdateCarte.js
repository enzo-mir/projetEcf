export default function postUpdateCarte(
  oldTitle,
  oldDesc,
  title,
  desc,
  price,
  formule
) {
  fetch("/updateCarte", {
    method: "POST",
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      oldTitle: oldTitle,
      oldDesc: oldDesc,
      title: title,
      desc: desc,
      price: price,
      formule: formule ? formule : null,
    }),
  });
}
