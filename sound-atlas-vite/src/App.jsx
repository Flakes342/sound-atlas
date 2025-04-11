import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";
import countries from "./data/countries.geo.json";
import logo from "./data/vybe.png";
import "./App.css"; // Import the styles

function App() {
  const globeRef = useRef();
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
  
    // 🔧 Fix clipping by adjusting camera planes
    globe.camera().near = 0.1;
    globe.camera().far = 2000;
    globe.camera().updateProjectionMatrix();
  
    globe.controls().autoRotate = false;
    globeRef.current.pointOfView({ lat: 20, lng: -60, altitude: 2 }, 1000);

  
    let animationId;
    const animate = () => {
      globe.controls().update();
      animationId = requestAnimationFrame(animate);
    };
    animate();
  
    return () => cancelAnimationFrame(animationId);
  }, []);

  const handlePolygonClick = (feature) => {
    setSelectedCountry({
      name: feature.properties.name || "Unknown",
      tracks: ["Track 1", "Track 2", "Track 3"], // Placeholder tracks
    });
  };

  return (
    <div className="app">
      {/* Left Sidebar */}
      <div className="sidebar">
      <div className="app-logo">
        <img src={logo} alt="Vybe Logo" className="logo-image" />
      </div>
        <label className="label">Genre:</label>
        <select className="dropdown">
          <option>Pop</option>
          <option>Rock</option>
          <option>Hip-Hop</option>
          <option>Jazz</option>
        </select>
        <div className="account-section">
        <button className="spotify-btn">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
            alt="Spotify"
            className="spotify-icon"
          />
          <span>Sign in with Spotify</span>
        </button>
        </div>
      </div>

      {/* Globe */}
      <div className="globe-container">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="#000000"
          polygonsData={countries.features}
          polygonCapColor={() => "rgba(0,0,0,0)"}
          polygonSideColor={() => "rgba(152, 197, 93, 0.57)"}
          polygonStrokeColor={() => "#00ffff"}
          polygonLabel={(d) => `${d.properties.name}`}
          onPolygonClick={handlePolygonClick}
          onPolygonHover={(d) => setHoveredCountry(d)}
          cameraFar={1000}
        />
      </div>

      {/* Floating Country Panel */}
      {selectedCountry && (
        <div className="floating-panel">
          <h3>🎵 {selectedCountry.name}</h3>
          <p>Top Tracks (Demo):</p>
          <ul>
            {selectedCountry.tracks.map((track, i) => (
              <li key={i}>{track}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
