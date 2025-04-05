import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

function App() {
  const globeRef = useRef();

  useEffect(() => {
    // Set initial camera position
    globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Globe
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
        backgroundColor="#000000"
      />
    </div>
  );
}

export default App;
