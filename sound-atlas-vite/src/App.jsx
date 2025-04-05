import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

function App() {
  const globeRef = useRef();

  useEffect(() => {
    const globe = globeRef.current;

    globe.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);

    // Enable auto-rotation
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 1.0;

    // Add light
    const directionalLight = globe.scene().children.find(
      obj => obj.type === "DirectionalLight"
    );
    if (directionalLight) {
      directionalLight.intensity = 1.2;
    }

    const ambientLight = globe.scene().children.find(
      obj => obj.type === "AmbientLight"
    );
    if (ambientLight) {
      ambientLight.intensity = 1.5;
    }
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
