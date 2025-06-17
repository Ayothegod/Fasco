export const query = {
  get: (key: string) => new URLSearchParams(window.location.search).get(key),
  set: (key: string, value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.replaceState(null, "", url.toString());
  },
  delete: (key: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete(key);
    window.history.replaceState(null, "", url.toString());
  },
};
