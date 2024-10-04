const url = 'https://swapi.dev/api/planets';

const planetsAPI = async () => {
  const response = await fetch(url);
  const data = await response.json();

  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default planetsAPI;
