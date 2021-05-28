import { Input, Box, Flex, Button, Image, SimpleGrid, Heading, Spinner } from "@chakra-ui/react";
import React from "react";
import Cloudy from "../assets/windy.gif";
import Sunny from "../assets/sunny_alt.gif";
import Rainy from "../assets/rainy.gif";
import Drizzle from "../assets/drizzle.gif";
import { useState, useEffect, useRef } from "react";
import { fetchWeatherData } from "../functions/index";
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const getWeatherIcon = (name) => {
  console.log(name);

  switch (name) {
    case "Clouds":
      return Cloudy;
      break;
    case "Clear":
      return Sunny;
      break;
    case "Rain":
      return Rainy;
      break;
    case "Drizzle":
      return Drizzle;
      break;
    default:
      return Sunny;
    // code block
  }
};

export default function Home() {
  const [location, setLocation] = useState("Split");
  const [weatherData, setWeatherData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [disabledState, setDisabledState] = useState(true);
  const [weatherIcon, setWeatherIcon] = useState("sunny");
  const inputRef = useRef();
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setWeatherData(await fetchWeatherData(location));
      setIsLoading(false);
    })();
  }, [location]);
  console.log("weather", weatherData);
  return (
    <Flex direction="column" justify="center" align="center">
      <Flex w={"50%"} my={3}>
        <Input
          ref={inputRef}
          variant="outline"
          placeholder="City name..."
          onChange={(e) => {
            e.target.value.length > 0 ? setDisabledState(false) : setDisabledState(true);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter" && inputRef.current.value !== "") {
              setLocation(inputRef.current.value);
              inputRef.current.value = "";
            }
          }}
        />
        <Button
          colorScheme="teal"
          variant="outline"
          px={5}
          isLoading={false}
          disabled={disabledState}
          onClick={() => {
            setLocation(inputRef.current.value);
            inputRef.current.value = "";
          }}
        >
          Submit
        </Button>
      </Flex>
      {isLoading ? (
        <Spinner size="xl" />
      ) : (
        <Flex direction="column" justify="center" align="center">
          <Heading as="h3" size="lg" my={2}>
            {weatherData.name}
          </Heading>
          <SimpleGrid my={4} columns={2} spacing={10} width="100%">
            <Flex direction="column" justify="center" align="flex-start">
              <Flex direction="column" justify="center" align="center">
                <Image width="200px" objectFit="cover" src={getWeatherIcon(weatherData.weather[0].main)} />
                <Heading as="h3" size="lg" p={0} m={0}>
                  {Math.round(weatherData.main.temp) + "°C"}
                </Heading>
              </Flex>
            </Flex>
            <Flex direction="column" justify="center" align="flex-end">
              <Heading as="h3" size="lg" my={2}>
                {capitalize(weatherData.weather[0].description)}
              </Heading>
              <Heading as="h3" size="sm" my={2}>
                {"Feels like " + weatherData.main.feels_like + "°C"}
              </Heading>
              <Heading as="h3" size="sm" my={2}>
                {`Min: ${Math.round(weatherData.main.temp_min)}°C`}
              </Heading>
              <Heading as="h3" size="sm" my={2}>
                {`Max: ${Math.round(weatherData.main.temp_max)}°C`}
              </Heading>
              <Heading as="h3" size="sm" my={2}>
                {`${weatherData.main.pressure} hPa`}
              </Heading>
              <Heading as="h3" size="sm" my={2}>
                {`${weatherData.main.humidity}% humidity`}
              </Heading>
            </Flex>
          </SimpleGrid>
        </Flex>
      )}
    </Flex>
  );
}
