import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Corrige o bug do ícone do Leaflet com Vite usando CDN
const icone = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

const arenas = [
  { team: "Atlanta Hawks", arena: "State Farm Arena", lat: 33.7573, lng: -84.3963, abbrev: "ATL" },
  { team: "Boston Celtics", arena: "TD Garden", lat: 42.3662, lng: -71.0621, abbrev: "BOS" },
  { team: "Brooklyn Nets", arena: "Barclays Center", lat: 40.6826, lng: -73.9754, abbrev: "BKN" },
  { team: "Charlotte Hornets", arena: "Spectrum Center", lat: 35.2251, lng: -80.8392, abbrev: "CHA" },
  { team: "Chicago Bulls", arena: "United Center", lat: 41.8807, lng: -87.6742, abbrev: "CHI" },
  { team: "Cleveland Cavaliers", arena: "Rocket Mortgage FieldHouse", lat: 41.4964, lng: -81.6882, abbrev: "CLE" },
  { team: "Dallas Mavericks", arena: "American Airlines Center", lat: 32.7905, lng: -96.8103, abbrev: "DAL" },
  { team: "Denver Nuggets", arena: "Ball Arena", lat: 39.7487, lng: -105.0077, abbrev: "DEN" },
  { team: "Detroit Pistons", arena: "Little Caesars Arena", lat: 42.3410, lng: -83.0548, abbrev: "DET" },
  { team: "Golden State Warriors", arena: "Chase Center", lat: 37.7680, lng: -122.3877, abbrev: "GSW" },
  { team: "Houston Rockets", arena: "Toyota Center", lat: 29.7508, lng: -95.3621, abbrev: "HOU" },
  { team: "Indiana Pacers", arena: "Gainbridge Fieldhouse", lat: 39.7640, lng: -86.1555, abbrev: "IND" },
  { team: "LA Clippers", arena: "Intuit Dome", lat: 33.8958, lng: -118.3406, abbrev: "LAC" },
  { team: "Los Angeles Lakers", arena: "Crypto.com Arena", lat: 34.0430, lng: -118.2673, abbrev: "LAL" },
  { team: "Memphis Grizzlies", arena: "FedExForum", lat: 35.1383, lng: -90.0505, abbrev: "MEM" },
  { team: "Miami Heat", arena: "Kaseya Center", lat: 25.7814, lng: -80.1870, abbrev: "MIA" },
  { team: "Milwaukee Bucks", arena: "Fiserv Forum", lat: 43.0450, lng: -87.9170, abbrev: "MIL" },
  { team: "Minnesota Timberwolves", arena: "Target Center", lat: 44.9795, lng: -93.2760, abbrev: "MIN" },
  { team: "New Orleans Pelicans", arena: "Smoothie King Center", lat: 29.9490, lng: -90.0820, abbrev: "NOP" },
  { team: "New York Knicks", arena: "Madison Square Garden", lat: 40.7505, lng: -73.9934, abbrev: "NYK" },
  { team: "Oklahoma City Thunder", arena: "Paycom Center", lat: 35.4634, lng: -97.5151, abbrev: "OKC" },
  { team: "Orlando Magic", arena: "Kia Center", lat: 28.5392, lng: -81.3839, abbrev: "ORL" },
  { team: "Philadelphia 76ers", arena: "Wells Fargo Center", lat: 39.9012, lng: -75.1720, abbrev: "PHI" },
  { team: "Phoenix Suns", arena: "Footprint Center", lat: 33.4457, lng: -112.0712, abbrev: "PHX" },
  { team: "Portland Trail Blazers", arena: "Moda Center", lat: 45.5316, lng: -122.6668, abbrev: "POR" },
  { team: "Sacramento Kings", arena: "Golden 1 Center", lat: 38.5805, lng: -121.4994, abbrev: "SAC" },
  { team: "San Antonio Spurs", arena: "Frost Bank Center", lat: 29.4270, lng: -98.4375, abbrev: "SAS" },
  { team: "Toronto Raptors", arena: "Scotiabank Arena", lat: 43.6435, lng: -79.3791, abbrev: "TOR" },
  { team: "Utah Jazz", arena: "Delta Center", lat: 40.7683, lng: -111.9011, abbrev: "UTA" },
  { team: "Washington Wizards", arena: "Capital One Arena", lat: 38.8981, lng: -77.0209, abbrev: "WAS" },
]

function NBAMap() {
  return (
    <div style={{ height: 'calc(100vh - 64px)' }}>
      <MapContainer
        center={[39.5, -98.35]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {arenas.map((arena) => (
          <Marker key={arena.abbrev} position={[arena.lat, arena.lng]} icon={icone}>
            <Popup>
              <div className="text-center">
                <img
                  src={`https://a.espncdn.com/i/teamlogos/nba/500/${arena.abbrev}.png`}
                  alt={arena.team}
                  style={{ width: '60px', margin: '0 auto 8px' }}
                />
                <p style={{ fontWeight: 'bold', marginBottom: '4px' }}>{arena.team}</p>
                <p style={{ color: '#666', fontSize: '0.85rem' }}>{arena.arena}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default NBAMap
