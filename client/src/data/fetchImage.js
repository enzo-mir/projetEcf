export const imagesFetched = async () => {
  let fetching = fetch("/images").then(async (resp) => await resp.json());
  return await fetching;
};
