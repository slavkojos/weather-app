export const fetchWeatherData = async (location) => {
  try {
    const api_key = "67a3f058bea680307f4d7bf8be143117";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error", error);
  }
};
