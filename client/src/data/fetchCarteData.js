export const carteQuery = async () => {
  let fetching = fetch("/carteapi").then(async (resp) => await resp.json());
  return await fetching;
};
