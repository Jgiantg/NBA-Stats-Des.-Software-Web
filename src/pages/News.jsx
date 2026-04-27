import { useState, useEffect } from 'react'
import Loading from '../components/Loading'

const ESPN_BASE = import.meta.env.DEV
  ? '/espn-api'
  : 'https://site.api.espn.com'

function News() {
  const [noticias, setNoticias] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    fetch(`${ESPN_BASE}/apis/site/v2/sports/basketball/nba/news`)
      .then((res) => res.json())
      .then((data) => {
        setNoticias(data.articles || [])
        setCarregando(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar notícias:', err)
        setErro('Não foi possível carregar as notícias.')
        setCarregando(false)
      })
  }, [])

  return (
    <div className="bg-gray-950 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Últimas Notícias</h1>

        {carregando && <Loading />}

        {erro && <p className="text-red-500">{erro}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {noticias.map((noticia, index) => {
            const foto = noticia.images?.[0]?.url
            const link = noticia.links?.web?.href

            return (
              <div
                key={index}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/30 transition flex flex-col"
              >
                {foto && (
                  <img
                    src={foto}
                    alt={noticia.headline}
                    className="w-full h-44 object-cover"
                  />
                )}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  <p className="text-white font-bold text-sm leading-snug">
                    {noticia.headline}
                  </p>
                  {noticia.description && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-3">
                      {noticia.description}
                    </p>
                  )}
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-block text-xs font-semibold text-orange-500 hover:text-orange-400 transition"
                    >
                      Ler mais →
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default News
