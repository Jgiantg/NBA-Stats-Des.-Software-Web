import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'

// Em dev usa o proxy do Vite pra evitar CORS. Em produção chama direto.
const ESPN_BASE = import.meta.env.DEV
  ? '/espn-api'
  : 'https://site.api.espn.com'

function Teams() {
  const [times, setTimes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    // Busca todos os times da NBA
    fetch(`${ESPN_BASE}/apis/site/v2/sports/basketball/nba/teams`)
      .then((res) => res.json())
      .then((data) => {
        const lista = data.sports[0].leagues[0].teams
        setTimes(lista)
        setCarregando(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar times:', err)
        setErro('Não foi possível carregar os times.')
        setCarregando(false)
      })
  }, [])

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Times da NBA</h1>

        {carregando && <Loading />}

        {erro && <p className="text-red-500">{erro}</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {times.map(({ team }) => (
            <Link
              key={team.id}
              to={`/teams/${team.id}`}
              className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-red-600/30 transition flex flex-col items-center gap-3 hover:scale-105"
            >
              <img
                src={`https://a.espncdn.com/i/teamlogos/nba/500/${team.abbreviation}.png`}
                alt={team.displayName}
                className="w-20 h-20 object-contain"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <p className="text-white font-semibold text-sm text-center">{team.displayName}</p>
              <p className="text-gray-400 text-xs">{team.abbreviation}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Teams
