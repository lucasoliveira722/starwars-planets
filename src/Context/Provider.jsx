import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [selectedFilters, setSelectedFilters] = useState([]);

  const contextValue = {
    data,
    nameFilter,
    selected,
    selectedFilters,
    setPlanets,
    setNameFilter,
    setSelected,
    setSelectedFilters,
  };

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.isRequired,
};

export default Provider;
