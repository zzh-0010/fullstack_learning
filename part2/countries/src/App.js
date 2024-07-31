import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')

  useEffect( () => {
    console.log('effect...')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  },[])
  
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }
  console.log(countries)
  const countryToShow = filterName ? countries.filter(country => country.name.common.toLowerCase().includes(filterName)) : []
  console.log(filterName)
  console.log(countryToShow.length)

  const toShow = countryToShow => {
    return (
      <div>
        <h1>{countryToShow[0].name.common}</h1>
        <p>capital {countryToShow[0].capital[0]}</p>
        <p>area {countryToShow[0].area}</p>
        <h2>Languages</h2>
          <ul>
            {Object.keys(countryToShow[0].languages).map(key => 
              <li key={key}>{`${countryToShow[0].languages[key]}`}</li>
            )}
          </ul>
          <img src={countryToShow[0].flags.png}/>
            <h1>Weather in {countryToShow[0].capital[0]}</h1>
            temperature {weather.main.temp}
            <br/>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <br/>
            wind {weather.wind.speed} m/s
      </div>
    )
  }

  const toPressShow = (filName) => {
    setFilterName(filName.toLowerCase())
  }

  //现在来写天气
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  useEffect( () => {
    console.log('Wether effect...')
    if(countryToShow.length === 1){
      console.log(countryToShow[0].capitalInfo.latlng[0], countryToShow[0].capitalInfo.latlng[1])
      console.log('CTS',countryToShow)
      const [lat, lon] = countryToShow[0].capitalInfo.latlng
      axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
    }
  },[countryToShow.length]) 


//如何显示获得的数据呢
  return (
    <div>
      <form>
        <div>
          find countries<input
          value={filterName} 
          onChange={handleFilterChange}
          />
        </div>
      </form>
      <div>
        {countryToShow.length >1 && countryToShow.length <=10 &&
          countryToShow.map( country => {
            return (
              <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => toPressShow(country.name.common)}>show</button>
              </div>
            )
          }
          )
        }
      </div>
      <div>
        {countryToShow.length > 10 && <p>Too many matches, specify another filter!</p>}
      </div>
      <div>
        {countryToShow.length === 1 && weather&& toShow(countryToShow)
        }
      </div>
      <div>
        {countryToShow.length === 0 && 
        <p>Search the country</p>
        }
      </div>
    </div>
  )
}

export default App;
