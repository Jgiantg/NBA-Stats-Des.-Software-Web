import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-black border-b-2 border-red-600 px-6 py-4 flex items-center justify-between">
      <span className="text-white font-bold text-xl tracking-wide">
        🏀 NBA Stats
      </span>
      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold underline' : 'text-white hover:text-orange-400 transition'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/teams"
          className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold underline' : 'text-white hover:text-orange-400 transition'
          }
        >
          Times
        </NavLink>
        <NavLink
          to="/standings"
          className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold underline' : 'text-white hover:text-orange-400 transition'
          }
        >
          Classificação
        </NavLink>
        <NavLink
          to="/news"
          className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold underline' : 'text-white hover:text-orange-400 transition'
          }
        >
          News
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? 'text-orange-500 font-semibold underline' : 'text-white hover:text-orange-400 transition'
          }
        >
          Mapa
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
