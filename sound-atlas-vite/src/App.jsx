import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Globe from "react-globe.gl";

function GlobeComponent() {
  const globeRef = useRef();

  // Keep controls smooth (updates on every frame)
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.controls().update();
    }
  });

  useEffect(() => {
    const globe = globeRef.current;

    // Set initial camera position
    globe.pointOfView({ lat: 20, lng: 0, altitude: 2 }, 1000);

    // Disable auto-rotation
    globe.controls().autoRotate = false;

    // Adjust lighting
    const directionalLight = globe.scene().children.find(obj => obj.type === "DirectionalLight");
    if (directionalLight) directionalLight.intensity = 1.0;

    const ambientLight = globe.scene().children.find(obj => obj.type === "AmbientLight");
    if (ambientLight) ambientLight.intensity = 1.2;
  }, []);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      backgroundColor="#000"
    />
  );
}

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000" }}>
      <Canvas>
        <GlobeComponent />
      </Canvas>
    </div>
  );
}

export default App;
