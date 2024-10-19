import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Cadastro } from '../types';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  cadastros: Cadastro[];
}

const mapStyles = [
  {
    name: 'Mapbox',
    url: 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11', // ou outro estilo que desejar
  },
  {
    name: 'OpenStreetMap',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: 'Stamen Toner',
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png',
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: 'Stamen Terrain',
    url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png',
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  {
    name: 'Esri World Street Map',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution:
      'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012',
  },
  {
    name: 'CartoDB Dark Matter',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
];

const Map: React.FC<MapProps> = ({ cadastros }) => {
  const [currentStyle, setCurrentStyle] = useState(0);

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 bg-white border-b">
        <select
          className="w-full p-2 border rounded"
          value={currentStyle}
          onChange={(e) => setCurrentStyle(Number(e.target.value))}
        >
          {mapStyles.map((style, index) => (
            <option key={index} value={index}>
              {style.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-grow">
        <MapContainer
          center={[-23.5505, -46.6333]}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url={mapStyles[currentStyle].url}
            attribution={mapStyles[currentStyle].attribution}
            id={mapStyles[currentStyle].id} // Add this line for Mapbox support
          />
          {cadastros.map((cadastro) => (
            <Marker
              key={cadastro.id}
              position={[cadastro.latitude, cadastro.longitude]}
            >
              <Popup>
                <div>
                  <h3 className="font-bold">{cadastro.nome}</h3>
                  <p>
                    {cadastro.logradouro}, {cadastro.numero}
                  </p>
                  <p>
                    {cadastro.bairro}, {cadastro.cidade}
                  </p>
                  <p>CEP: {cadastro.cep}</p>
                  <p>Grupo: {cadastro.grupo}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
