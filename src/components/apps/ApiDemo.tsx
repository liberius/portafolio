import { useState } from 'react'
import './ApiDemo.css'

type DemoTab = 'pokemon' | 'nasa' | 'weather'

interface Pokemon {
  name: string
  id: number
  sprite: string
  types: string[]
  height: number
  weight: number
}

interface NasaApod {
  title: string
  date: string
  explanation: string
  url: string
  media_type: string
}

interface Weather {
  city: string
  temp: number
  description: string
  icon: string
  humidity: number
  wind: number
}

export const ApiDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DemoTab>('pokemon')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Pokemon state
  const [pokemonName, setPokemonName] = useState('pikachu')
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  // NASA state
  const [nasa, setNasa] = useState<NasaApod | null>(null)

  // Weather state
  const [city, setCity] = useState('Santiago')
  const [weather, setWeather] = useState<Weather | null>(null)

  const fetchPokemon = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
      if (!response.ok) throw new Error('Pokémon no encontrado')
      const data = await response.json()
      setPokemon({
        name: data.name,
        id: data.id,
        sprite: data.sprites.front_default,
        types: data.types.map((t: any) => t.type.name),
        height: data.height,
        weight: data.weight,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const fetchNasa = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      if (!response.ok) throw new Error('Error al cargar datos de NASA')
      const data = await response.json()
      setNasa(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  const fetchWeather = async () => {
    setLoading(true)
    setError(null)
    try {
      // Using Open-Meteo (no API key required)
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`
      )
      const geoData = await geoResponse.json()

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error('Ciudad no encontrada')
      }

      const { latitude, longitude, name } = geoData.results[0]

      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      )
      const weatherData = await weatherResponse.json()

      const temp = weatherData.current_weather.temperature
      const weatherCode = weatherData.current_weather.weathercode

      // Map weather codes to descriptions
      const weatherDescriptions: Record<number, string> = {
        0: 'Despejado',
        1: 'Mayormente despejado',
        2: 'Parcialmente nublado',
        3: 'Nublado',
        45: 'Neblina',
        48: 'Neblina helada',
        51: 'Llovizna ligera',
        61: 'Lluvia ligera',
        63: 'Lluvia moderada',
        65: 'Lluvia intensa',
        80: 'Chubascos',
      }

      setWeather({
        city: name,
        temp,
        description: weatherDescriptions[weatherCode] || 'Desconocido',
        icon: weatherCode === 0 ? '☀️' : weatherCode <= 3 ? '⛅' : weatherCode >= 61 ? '🌧️' : '☁️',
        humidity: 0, // Not available in free tier
        wind: weatherData.current_weather.windspeed,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="apidemo">
      <div className="apidemo__tabs">
        <button
          className={`apidemo__tab ${activeTab === 'pokemon' ? 'apidemo__tab--active' : ''}`}
          onClick={() => setActiveTab('pokemon')}
        >
          🎮 PokéDex
        </button>
        <button
          className={`apidemo__tab ${activeTab === 'nasa' ? 'apidemo__tab--active' : ''}`}
          onClick={() => setActiveTab('nasa')}
        >
          🚀 NASA APOD
        </button>
        <button
          className={`apidemo__tab ${activeTab === 'weather' ? 'apidemo__tab--active' : ''}`}
          onClick={() => setActiveTab('weather')}
        >
          🌤️ Clima
        </button>
      </div>

      <div className="apidemo__content">
        {/* Pokemon Tab */}
        {activeTab === 'pokemon' && (
          <div className="apidemo__section">
            <h3>PokéDex - PokeAPI</h3>
            <p className="apidemo__description">
              Busca información de cualquier Pokémon usando la PokeAPI pública
            </p>

            <div className="apidemo__form">
              <input
                type="text"
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
                placeholder="Nombre del Pokémon"
                className="apidemo__input"
                onKeyPress={(e) => e.key === 'Enter' && fetchPokemon()}
              />
              <button onClick={fetchPokemon} disabled={loading} className="apidemo__button">
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {error && <div className="apidemo__error">❌ {error}</div>}

            {pokemon && (
              <div className="apidemo__result apidemo__pokemon">
                <img src={pokemon.sprite} alt={pokemon.name} className="apidemo__pokemon-sprite" />
                <div className="apidemo__pokemon-info">
                  <h4>
                    #{pokemon.id} {pokemon.name.toUpperCase()}
                  </h4>
                  <div className="apidemo__pokemon-types">
                    {pokemon.types.map((type) => (
                      <span key={type} className={`apidemo__type apidemo__type--${type}`}>
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className="apidemo__pokemon-stats">
                    <div>Altura: {pokemon.height / 10}m</div>
                    <div>Peso: {pokemon.weight / 10}kg</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* NASA Tab */}
        {activeTab === 'nasa' && (
          <div className="apidemo__section">
            <h3>NASA - Astronomy Picture of the Day</h3>
            <p className="apidemo__description">
              Imagen astronómica del día proporcionada por la NASA
            </p>

            <button onClick={fetchNasa} disabled={loading} className="apidemo__button">
              {loading ? 'Cargando...' : 'Cargar APOD del Día'}
            </button>

            {error && <div className="apidemo__error">❌ {error}</div>}

            {nasa && (
              <div className="apidemo__result apidemo__nasa">
                <h4>{nasa.title}</h4>
                <p className="apidemo__nasa-date">{nasa.date}</p>
                {nasa.media_type === 'image' && (
                  <img src={nasa.url} alt={nasa.title} className="apidemo__nasa-image" />
                )}
                <p className="apidemo__nasa-explanation">{nasa.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Weather Tab */}
        {activeTab === 'weather' && (
          <div className="apidemo__section">
            <h3>Clima - Open-Meteo API</h3>
            <p className="apidemo__description">Consulta el clima actual de cualquier ciudad</p>

            <div className="apidemo__form">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Nombre de la ciudad"
                className="apidemo__input"
                onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
              />
              <button onClick={fetchWeather} disabled={loading} className="apidemo__button">
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            {error && <div className="apidemo__error">❌ {error}</div>}

            {weather && (
              <div className="apidemo__result apidemo__weather">
                <div className="apidemo__weather-icon">{weather.icon}</div>
                <div className="apidemo__weather-info">
                  <h4>{weather.city}</h4>
                  <div className="apidemo__weather-temp">{weather.temp}°C</div>
                  <div className="apidemo__weather-desc">{weather.description}</div>
                  <div className="apidemo__weather-details">
                    <div>💨 Viento: {weather.wind} km/h</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
