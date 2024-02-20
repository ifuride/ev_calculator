const BASE_URL = "https://fever-sandbox.ew.r.appspot.com/calculate";

export const getValues = async (formState: Record<string, string>) => {
  try {
    const queryParams = new URLSearchParams();

    for (const key in formState) {
      queryParams.append(key, formState[key]);
    }

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }

    return response.json();
  } catch (err) {
    console.log(err);
  }
};
