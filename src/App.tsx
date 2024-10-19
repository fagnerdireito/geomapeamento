import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import { Cadastro } from './types';
import { MapPin } from 'lucide-react';

// Simulated data (replace this with actual data from your MySQL database)
const mockCadastros: Cadastro[] = [
  { id: 1, nome: 'João Silva', logradouro: 'Av. Paulista', cidade: 'São Paulo', numero: '1000', cep: '01310-100', bairro: 'Bela Vista', grupo: 'Grupo A', latitude: -23.5613, longitude: -46.6560 },
  { id: 2, nome: 'Maria Santos', logradouro: 'Rua Oscar Freire', cidade: 'São Paulo', numero: '500', cep: '01426-001', bairro: 'Jardins', grupo: 'Grupo B', latitude: -23.5616, longitude: -46.6720 },
  { id: 3, nome: 'Carlos Oliveira', logradouro: 'Av. Brigadeiro Faria Lima', cidade: 'São Paulo', numero: '3000', cep: '04538-132', bairro: 'Itaim Bibi', grupo: 'Grupo A', latitude: -23.5859, longitude: -46.6819 },
];

function App() {
  const [cadastros, setCadastros] = useState<Cadastro[]>(mockCadastros);
  const [filteredCadastros, setFilteredCadastros] = useState<Cadastro[]>(mockCadastros);
  const [filters, setFilters] = useState({
    city: '',
    neighborhood: '',
    group: '',
  });

  const cities = Array.from(new Set(cadastros.map((c) => c.cidade)));
  const neighborhoods = Array.from(new Set(cadastros.map((c) => c.bairro)));
  const groups = Array.from(new Set(cadastros.map((c) => c.grupo)));

  useEffect(() => {
    // Apply filters
    const filtered = cadastros.filter((cadastro) => {
      return (
        (filters.city === '' || cadastro.cidade === filters.city) &&
        (filters.neighborhood === '' || cadastro.bairro === filters.neighborhood) &&
        (filters.group === '' || cadastro.grupo === filters.group)
      );
    });
    setFilteredCadastros(filtered);
  }, [cadastros, filters]);

  const handleFilterChange = (filterType: 'city' | 'neighborhood' | 'group', value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 p-4">
        <Sidebar
          cities={cities}
          neighborhoods={neighborhoods}
          groups={groups}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="w-3/4 p-4">
        <div className="bg-white rounded-lg shadow-md h-full flex flex-col">
          <div className="p-4 border-b flex items-center">
            <MapPin className="mr-2" />
            <h1 className="text-2xl font-bold">Mapa de Cadastros</h1>
          </div>
          <div className="flex-grow">
            <Map cadastros={filteredCadastros} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;