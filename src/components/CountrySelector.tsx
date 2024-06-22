import React from 'react';

interface CountrySelectorProps {
  countries: any[];
  onSelect: (country: string) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ countries, onSelect }) => {
  return (
    <div className="select-wrapper">
      <select className="custom-select" onChange={(e) => onSelect(e.target.value)}>
        {countries.map((country) => (
          <option key={country.cca2} value={country.name.common}>
            {country.name.common}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
