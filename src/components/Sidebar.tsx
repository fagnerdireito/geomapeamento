import React from 'react';
import { Filter } from 'lucide-react';

interface SidebarProps {
  cities: string[];
  neighborhoods: string[];
  groups: string[];
  filters: {
    city: string;
    neighborhood: string;
    group: string;
  };
  onFilterChange: (filterType: 'city' | 'neighborhood' | 'group', value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ cities, neighborhoods, groups, filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 shadow-md h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Filter className="mr-2" /> Filtros
      </h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Cidade</label>
          <select
            id="city"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filters.city}
            onChange={(e) => onFilterChange('city', e.target.value)}
          >
            <option value="">Todas</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Bairro</label>
          <select
            id="neighborhood"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filters.neighborhood}
            onChange={(e) => onFilterChange('neighborhood', e.target.value)}
          >
            <option value="">Todos</option>
            {neighborhoods.map((neighborhood) => (
              <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="group" className="block text-sm font-medium text-gray-700">Grupo</label>
          <select
            id="group"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={filters.group}
            onChange={(e) => onFilterChange('group', e.target.value)}
          >
            <option value="">Todos</option>
            {groups.map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;