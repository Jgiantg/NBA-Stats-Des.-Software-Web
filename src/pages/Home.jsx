import { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import Loading from '../components/Loading'

const ESPN_BASE = import.meta.env.DEV
  ? '/espn-api'
  : 'https://corsproxy.io/?https://site.api.espn.com'

function Home() {
  const [jogos, setJogos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    // Busca os jogos do dia na ESPN
    fetch(`${ESPN_BASE}/apis/site/v2/sports/basketball/nba/scoreboard`)
      .then((res) => res.json())
      .then((data) => {
        setJogos(data.events || [])
        setCarregando(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar jogos:', err)
        setErro('Não foi possível carregar os jogos.')
        setCarregando(false)
      })
  }, [])

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">Jogos de Hoje</h1>
        <p className="text-gray-400 mb-6 capitalize">{dataHoje}</p>

        {carregando && <Loading />}

        {erro && <p className="text-red-500">{erro}</p>}

        {!carregando && !erro && jogos.length === 0 && (
          <p className="text-gray-400 text-center mt-10">
            Nenhum jogo hoje. Tente outro dia.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jogos.map((jogo) => {
            const competicao = jogo.competitions[0]
            const times = competicao.competitors

            const timeCasa = times.find((t) => t.homeAway === 'home')
            const timeVisitante = times.find((t) => t.homeAway === 'away')
            const status = competicao.status.type.description

            return (
              <GameCard
                key={jogo.id}
                timeCasa={{
                  nome: timeCasa.team.displayName,
                  abreviacao: timeCasa.team.abbreviation,
                }}
                timeVisitante={{
                  nome: timeVisitante.team.displayName,
                  abreviacao: timeVisitante.team.abbreviation,
                }}
                placares={{
                  casa: timeCasa.score || '-',
                  visitante: timeVisitante.score || '-',
                }}
                status={status}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
