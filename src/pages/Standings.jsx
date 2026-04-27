import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

const ESPN_BASE = import.meta.env.DEV
  ? '/espn-api'
  : 'https://site.api.espn.com'

function Standings() {
  const [conferencias, setConferencias] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch(`${ESPN_BASE}/apis/v2/sports/basketball/nba/standings`)
      .then((res) => res.json())
      .then((data) => {
        // Cada item de children é uma conferência (Leste e Oeste)
        const lista = data.children || []
        setConferencias(lista)
        setCarregando(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar classificação:', err)
        setErro('Não foi possível carregar a classificação.')
        setCarregando(false)
      })
  }, [])

  function getValor(time, nomeColuna) {
    const col = time.stats?.find((s) => s.name === nomeColuna)
    return col?.displayValue ?? '-'
  }

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-8">Classificação NBA</h1>

        {carregando && <Loading />}
        {erro && <p className="text-red-500">{erro}</p>}

        {conferencias.map((conf) => (
          <div key={conf.name} className="mb-10">
            <h2 className="text-lg font-bold text-orange-500 mb-3 uppercase tracking-wide">
              {conf.name}
            </h2>

            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg">
              {/* Cabeçalho */}
              <div className="grid grid-cols-[2rem_1fr_3rem_3rem_3rem_4rem] items-center px-4 py-2 bg-gray-700 text-gray-400 text-xs font-semibold uppercase">
                <span>#</span>
                <span>Time</span>
                <span className="text-center">V</span>
                <span className="text-center">D</span>
                <span className="text-center">%</span>
                <span className="text-center">Dif</span>
              </div>

              {/* Linhas */}
              {conf.standings?.entries?.map((entry, index) => {
                const time = entry.team
                const posicao = index + 1
                // Playoff = top 6, Play-in = 7º e 8º
                const isPlayoff = posicao <= 6
                const isPlayIn = posicao === 7 || posicao === 8

                return (
                  <div
                    key={time.id}
                    className={`grid grid-cols-[2rem_1fr_3rem_3rem_3rem_4rem] items-center px-4 py-3 border-t border-gray-700 text-sm transition hover:bg-gray-700/50 ${
                      isPlayoff ? 'border-l-2 border-l-green-500' : ''
                    } ${isPlayIn ? 'border-l-2 border-l-yellow-500' : ''}`}
                  >
                    <span className="text-gray-400 font-bold">{posicao}</span>

                    <div className="flex items-center gap-2">
                      <img
                        src={`https://a.espncdn.com/i/teamlogos/nba/500/${time.abbreviation}.png`}
                        alt={time.displayName}
                        className="w-6 h-6 object-contain"
                        onError={(e) => { e.target.style.display = 'none' }}
                      />
                      <span className="text-white font-semibold text-xs leading-tight">
                        {time.shortDisplayName}
                      </span>
                    </div>

                    <span className="text-center text-green-400 font-bold">
                      {getValor(entry, 'wins')}
                    </span>
                    <span className="text-center text-red-400 font-bold">
                      {getValor(entry, 'losses')}
                    </span>
                    <span className="text-center text-gray-300">
                      {getValor(entry, 'winPercent')}
                    </span>
                    <span className="text-center text-gray-400">
                      {getValor(entry, 'gamesBehind')}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Legenda */}
            <div className="flex gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                Playoff
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>
                Play-In
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Standings
