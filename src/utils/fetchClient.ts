const BASE_URL = 'https://fever-sandbox.ew.r.appspot.com/calculate';

const request = (url: string,) => {
  const fullURL = BASE_URL + url;
  
  return fetch(fullURL)
    .then((response) => {
      if (!response.ok) {
        // throw new Error();

        return Promise.reject(
          `${response.status}`
        );
      }

      return response.json();
    });
};

export const getValues = (params: string) => request(`?${params}`);
