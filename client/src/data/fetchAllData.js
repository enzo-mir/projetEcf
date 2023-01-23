export const query = async () => {
  let fetching = fetch("/api").then(async (resp) => await resp.json());
  return await fetching;
};
