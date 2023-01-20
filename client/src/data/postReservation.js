const postReservation = (convives, date, email, nom, heures, allergies) => {
  fetch("/res", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Connection: "keep-alive",
      Accept: "*",
    },
    body: JSON.stringify({
      convives: convives,
      date: date,
      email: email,
      nom: nom,
      heures: heures,
      allergies: allergies,
    }),
  });
};

export default postReservation;
