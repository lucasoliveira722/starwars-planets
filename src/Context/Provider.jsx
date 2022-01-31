import PropTypes from 'prop-types';
import React, { useState } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [data, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const contextValue = {
    data,
    nameFilter,
    setPlanets,
    setNameFilter,
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
