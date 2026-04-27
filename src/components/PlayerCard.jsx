function PlayerCard({ athleteId, nome, posicao, dataNascimento, numero }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg hover:shadow-red-600/30 transition overflow-hidden flex flex-col">
      <div className="bg-gray-700 flex justify-center pt-4">
        <img
          src={`https://a.espncdn.com/i/headshots/nba/players/full/${athleteId}.png`}
          alt={nome}
          className="w-24 h-24 object-cover rounded-full border-2 border-red-600"
          onError={(e) => {
            e.target.src = 'https://a.espncdn.com/i/headshots/nba/players/full/1.png'
          }}
        />
      </div>
      <div className="p-4 flex flex-col gap-1">
        <p className="text-white font-bold text-sm text-center">{nome}</p>
        <p className="text-gray-400 text-xs text-center">{posicao}</p>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>Nascimento: {dataNascimento}</span>
          <span className="text-orange-500 font-bold">#{numero}</span>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
