import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState(false);
  
  const handleCityChange = useCallback(cityName => {
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2bb5d7a9d37784827dcf08c3dc8acae0&units=metric`)
    .then(res => {
      if(res.status === 200) {
        return res.json()
          .then(data => {
            setWeatherData ({
              city: data.name,
              temp: data.main.temp,
              icon: data.weather[0].icon,
              description: data.weather[0].main
            })
          })
        } else {
          setServerError(true);
        }
    });
    setPending(false);
    setServerError(false);
    },[]);

  return (
    <section>
      <PickCity action={handleCityChange} />
      { (!serverError && weatherData) && <WeatherSummary {...weatherData} /> }
      { (!serverError && pending) && <Loader /> }
      { serverError && <ErrorBox children='Something went wrong, try again' /> }
    </section>
  )
};

export default WeatherBox;