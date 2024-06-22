"use client";

import { useEffect, useState } from "react";

import CountrySelector from "../components/CountrySelector";
import HumidityWidget from "../components/HumidityWidget";
import PressureWidget from "../components/PressureWidget";
import TemperatureWidget from "../components/TemperatureWidget";
import WindWidget from "../components/WindWidget";
import axios from "axios";

const Home = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("London,uk");
  const [weatherData, setWeatherData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingTemperature, setLoadingTemperature] = useState<boolean>(false);
  const [loadingWind, setLoadingWind] = useState<boolean>(false);
  const [loadingHumidity, setLoadingHumidity] = useState<boolean>(false);
  const [loadingPressure, setLoadingPressure] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("/api/countries");
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/weather?country=${selectedCountry}`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedCountry) {
      fetchWeather();
    }
  }, [selectedCountry]);

  const refreshWeatherData = async (dataType: string) => {
    try {
      // Determine which loading state to set based on dataType
      switch (dataType) {
        case "temperature":
          setLoadingTemperature(true);
          break;
        case "wind":
          setLoadingWind(true);
          break;
        case "humidity":
          setLoadingHumidity(true);
          break;
        case "pressure":
          setLoadingPressure(true);
          break;
        default:
          break;
      }

      const response = await axios.get(
        `/api/weather?country=${selectedCountry}`
      );

      // Update weatherData based on dataType
      switch (dataType) {
        case "temperature":
          setWeatherData((prevData: any) => ({
            ...prevData,
            main: {
              ...prevData.main,
              temp_min: response.data.main.temp_min,
              temp_max: response.data.main.temp_max,
            },
          }));
          break;
        case "wind":
          setWeatherData((prevData: any) => ({
            ...prevData,
            wind: {
              ...prevData.wind,
              speed: response.data.wind.speed,
            },
          }));
          break;
        case "humidity":
          setWeatherData((prevData: any) => ({
            ...prevData,
            main: {
              ...prevData.main,
              humidity: response.data.main.humidity,
            },
          }));
          break;
        case "pressure":
          setWeatherData((prevData: any) => ({
            ...prevData,
            main: {
              ...prevData.main,
              pressure: response.data.main.pressure,
            },
          }));
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Error refreshing ${dataType} data:`, error);
    } finally {
      switch (dataType) {
        case "temperature":
          setLoadingTemperature(false);
          break;
        case "wind":
          setLoadingWind(false);
          break;
        case "humidity":
          setLoadingHumidity(false);
          break;
        case "pressure":
          setLoadingPressure(false);
          break;
        default:
          break;
      }
    }
  };
  return (
    <div>
      <h1>Weather Dashboard</h1>
      <CountrySelector countries={countries} onSelect={setSelectedCountry} />
      <div className="dashboard">
        <TemperatureWidget
          temperature={
            weatherData?.main
              ? {
                  min: weatherData.main.temp_min,
                  max: weatherData.main.temp_max,
                }
              : null
          }
          onRefresh={() => refreshWeatherData("temperature")}
          loading={loading}
          loadingTemperature={loadingTemperature}
        />
        <WindWidget
          wind={weatherData?.wind ? weatherData.wind.speed : null}
          onRefresh={() => refreshWeatherData("wind")}
          loading={loading}
          loadingWind={loadingWind}
        />
        <HumidityWidget
          humidity={weatherData?.main ? weatherData.main.humidity : null}
          onRefresh={() => refreshWeatherData("humidity")}
          loading={loading}
          loadingHumidity={loadingHumidity}
        />
        <PressureWidget
          pressure={weatherData?.main ? weatherData.main.pressure : null}
          onRefresh={() => refreshWeatherData("pressure")}
          loading={loading}
          loadingPressure={loadingPressure}
        />
      </div>
    </div>
  );
};

export default Home;
