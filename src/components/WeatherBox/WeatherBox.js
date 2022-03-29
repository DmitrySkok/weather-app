import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback } from 'react';

const WeatherBox = props => {
  
  const handleCityChange = useCallback(cityName => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2bb5d7a9d37784827dcf08c3dc8acae0&units=metric`)
    .then(res => res.json())
    .then(data => {
      const weatherData = {
        city: data.name,
        temp: data.main.temp,
        icon: data.weather[0].icon,
        description: data.weather[0].main
      };
      console.log(weatherData);
    });
    },[]);
  

  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary />
      <Loader />
    </section>
  )
};

export default WeatherBox;