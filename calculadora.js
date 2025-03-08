import React, { useState } from "react";
import { jsPDF } from "jspdf";

export default function EnergyCalculator() {
  const [surface, setSurface] = useState(100);
  const [year, setYear] = useState(2000);
  const [windows, setWindows] = useState("single");
  const [hvac, setHvac] = useState("gas");
  const [lighting, setLighting] = useState("incandescent");
  const [region, setRegion] = useState("continental");
  const [consumption, setConsumption] = useState(null);
  const [rating, setRating] = useState("");
  
  const calculateEnergy = () => {
    let baseConsumption = surface * (year < 1980 ? 100 : year < 2007 ? 70 : 50);
    let windowFactor = windows === "single" ? 1.2 : 1.0;
    let hvacFactor = hvac === "gas" ? 1.1 : hvac === "heatpump" ? 0.8 : 1.3;
    let lightingFactor = lighting === "incandescent" ? 1.3 : 1.0;
    let regionFactor = region === "atlantic" ? 1.2 : region === "continental" ? 1.0 : 0.8;
    
    let totalConsumption = baseConsumption * windowFactor * hvacFactor * lightingFactor * regionFactor;
    setConsumption(totalConsumption);
    
    let rating = totalConsumption < 50 ? "A" : totalConsumption < 75 ? "B" : totalConsumption < 100 ? "C" : totalConsumption < 150 ? "D" : totalConsumption < 210 ? "E" : totalConsumption < 250 ? "F" : "G";
    setRating(rating);
  };
  
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Informe de Eficiencia Energética", 10, 10);
    doc.text(`Superficie: ${surface} m²`, 10, 20);
    doc.text(`Año de construcción: ${year}`, 10, 30);
    doc.text(`Tipo de ventanas: ${windows}`, 10, 40);
    doc.text(`Sistema HVAC: ${hvac}`, 10, 50);
    doc.text(`Iluminación: ${lighting}`, 10, 60);
    doc.text(`Zona climática: ${region}`, 10, 70);
    doc.text(`Consumo estimado: ${consumption?.toFixed(2)} kWh/m²·año`, 10, 80);
    doc.text(`Calificación energética: ${rating}`, 10, 90);
    doc.save("informe_energetico.pdf");
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold mb-4">Calculadora Energética</h1>
      <label className="block">Superficie (m²):</label>
      <input type="number" value={surface} onChange={e => setSurface(e.target.value)} className="p-2 border rounded mb-2 w-full" />
      
      <label className="block">Año de construcción:</label>
      <input type="number" value={year} onChange={e => setYear(e.target.value)} className="p-2 border rounded mb-2 w-full" />
      
      <label className="block">Tipo de ventanas:</label>
      <select value={windows} onChange={e => setWindows(e.target.value)} className="p-2 border rounded mb-2 w-full">
        <option value="single">Vidrio simple</option>
        <option value="double">Vidrio doble</option>
      </select>
      
      <label className="block">Sistema HVAC:</label>
      <select value={hvac} onChange={e => setHvac(e.target.value)} className="p-2 border rounded mb-2 w-full">
        <option value="gas">Caldera de gas</option>
        <option value="heatpump">Bomba de calor</option>
        <option value="electric">Calefacción eléctrica</option>
      </select>
      
      <label className="block">Tipo de iluminación:</label>
      <select value={lighting} onChange={e => setLighting(e.target.value)} className="p-2 border rounded mb-2 w-full">
        <option value="incandescent">Incandescente</option>
        <option value="led">LED</option>
      </select>
      
      <label className="block">Zona Climática:</label>
      <select value={region} onChange={e => setRegion(e.target.value)} className="p-2 border rounded mb-2 w-full">
        <option value="atlantic">Atlántica</option>
        <option value="continental">Continental</option>
        <option value="mediterranean">Mediterránea</option>
      </select>
      
      <button onClick={calculateEnergy} className="bg-blue-500 text-white p-2 rounded mt-4">Calcular</button>
      <button onClick={generatePDF} className="bg-green-500 text-white p-2 rounded mt-4 ml-2">Descargar Informe</button>
      
      {consumption !== null && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Resultados:</h2>
          <p>Consumo estimado: <strong>{consumption.toFixed(2)}</strong> kWh/m²·año</p>
          <p>Calificación energética: <strong className="text-xl">{rating}</strong></p>
        </div>
      )}
    </div>
  );
}
