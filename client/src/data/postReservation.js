const postReservation = (
  convives,
  date,
  email,
  nom,
  heures,
  allergies,
  timeJourney
) => {
  let post = fetch("/res", {
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
      timeJourney: timeJourney,
    }),
  });
  return post;
};

export default postReservation;
