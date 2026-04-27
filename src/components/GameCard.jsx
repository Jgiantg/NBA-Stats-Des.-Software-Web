function GameCard({ timeCasa, timeVisitante, placares, status }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-red-600/30 transition flex flex-col gap-3">
      <p className="text-gray-400 text-sm text-center">{status}</p>

      <div className="flex items-center justify-between gap-4">
        {/* Time visitante */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <img
            src={`https://a.espncdn.com/i/teamlogos/nba/500/${timeVisitante.abreviacao}.png`}
            alt={timeVisitante.nome}
            className="w-14 h-14 object-contain"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className="text-white text-sm font-semibold text-center">{timeVisitante.abreviacao}</span>
          <span className="text-2xl font-bold text-white">{placares.visitante}</span>
        </div>

        <span className="text-gray-500 font-bold text-lg">VS</span>

        {/* Time da casa */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <img
            src={`https://a.espncdn.com/i/teamlogos/nba/500/${timeCasa.abreviacao}.png`}
            alt={timeCasa.nome}
            className="w-14 h-14 object-contain"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className="text-white text-sm font-semibold text-center">{timeCasa.abreviacao}</span>
          <span className="text-2xl font-bold text-white">{placares.casa}</span>
        </div>
      </div>
    </div>
  )
}

export default GameCard
