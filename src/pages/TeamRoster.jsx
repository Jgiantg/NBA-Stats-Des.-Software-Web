import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PlayerCard from '../components/PlayerCard'
import Loading from '../components/Loading'

function espnFetch(path) {
  if (import.meta.env.DEV) return fetch('/espn-api' + path)
  return fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://site.api.espn.com' + path))
}

function TeamRoster() {
  const { teamId } = useParams()
  const [elenco, setElenco] = useState([])
  const [time, setTime] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    espnFetch(`/apis/site/v2/sports/basketball/nba/teams/${teamId}/roster`)
      .then((res) => res.json())
      .then((data) => {
        setElenco(data.athletes || [])
        setTime(data.team || null)
        setCarregando(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar elenco:', err)
        setErro('Não foi possível carregar o elenco.')
        setCarregando(false)
      })
  }, [teamId])

  function formatarData(dataISO) {
    if (!dataISO) return 'N/A'
    const [ano, mes, dia] = dataISO.split('T')[0].split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/teams"
          className="inline-block mb-6 text-orange-500 hover:text-orange-400 font-semibold transition"
        >
          ← Voltar
        </Link>

        {carregando && <Loading />}

        {erro && <p className="text-red-500">{erro}</p>}

        {time && (
          <div className="flex items-center gap-4 mb-8">
            <img
              src={`https://a.espncdn.com/i/teamlogos/nba/500/${time.abbreviation}.png`}
              alt={time.displayName}
              className="w-20 h-20 object-contain"
            />
            <h1 className="text-2xl font-bold text-white">{time.displayName}</h1>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {elenco.map((jogador) => (
            <PlayerCard
              key={jogador.id}
              athleteId={jogador.id}
              nome={jogador.displayName}
              posicao={jogador.position?.abbreviation || 'N/A'}
              dataNascimento={formatarData(jogador.dateOfBirth)}
              numero={jogador.jersey || 'N/A'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamRoster
