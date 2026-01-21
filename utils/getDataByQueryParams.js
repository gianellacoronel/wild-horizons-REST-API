export const getDataByQueryParams = (data, queryObj) => {
  const { continent, country, is_open_to_public } = queryObj;
  if (continent) {
    data = data.filter(
      (place) => place.continent.toLowerCase() === continent.toLowerCase(),
    );
  }
  if (country) {
    data = data.filter(
      (place) => place.country.toLowerCase() === country.toLowerCase(),
    );
  }
  if (is_open_to_public) {
    data = data.filter(
      (place) =>
        place.is_open_to_public === JSON.parse(is_open_to_public.toLowerCase()),
    );
  }

  return data;
};
