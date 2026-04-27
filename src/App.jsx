import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Teams from './pages/Teams'
import TeamRoster from './pages/TeamRoster'
import NBAMap from './pages/NBAMap'
import News from './pages/News'
import Standings from './pages/Standings'

function App() {
  return (
    <BrowserRouter basename="/NBA-Stats-Des.-Software-Web">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:teamId" element={<TeamRoster />} />
        <Route path="/map" element={<NBAMap />} />
        <Route path="/news" element={<News />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
