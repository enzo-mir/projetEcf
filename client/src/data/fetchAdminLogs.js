export default function fetching(data) {
  let querie = {
    data: {},
  };

  fetch("/")
    .then((resp) => resp)
    .then((res) => (querie.data = res ? data : false));

  return querie;
}
