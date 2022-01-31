import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import planetsAPI from '../services/planetsAPI';
import './Table.css';

export default function Table() {
  const { data, nameFilter, setPlanets, setNameFilter } = useContext(AppContext);

  useEffect(() => {
    async function fetching() {
      const fetchedPlanets = await planetsAPI();
      setPlanets(data.concat(fetchedPlanets.results));
    }
    fetching();
  }, []);

  return (
    <div>
      This is our table
      <br />
      <label htmlFor="search">
        Procure por um planeta
        <input
          type="text"
          id="search"
          onChange={ (event) => setNameFilter(event.target.value) }
        />
      </label>
      <table>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        {
          data
            .filter((planet) => planet.name.toLowerCase().match(nameFilter.toLowerCase()))
            .map((planet, key) => (
              <tr key={ key }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
        }
      </table>
    </div>);
}
// array de filtros filters=[{type:'status', name: 'gold'}, {type:'country', name:'sweden'}] - TYPE É O NOME DA CHAVE, E NAME É O VALOR
// filteredResults = prodList.filter( el => filters.some (filterEl => el[filterEl.type] === filterEl.name))
// array com todos os dados. Passa por uym filtro, depois devolve
