import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import planetsAPI from '../services/planetsAPI';
import './Table.css';

export default function Table() {
  const {
    data,
    nameFilter,
    selected,
    selectedFilters,
    setPlanets,
    setNameFilter,
    setSelected,
    setSelectedFilters,
  } = useContext(AppContext);

  useEffect(() => {
    async function fetching() {
      const fetchedPlanets = await planetsAPI();
      setPlanets(data.concat(fetchedPlanets.results));
    }
    fetching();
  }, []);

  const tratarDados = (linha) => {
    const bools = [];
    selectedFilters.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        bools.push(Number(linha[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        bools.push(Number(linha[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        bools.push(linha[filter.column] === filter.value);
        break;
      default:
        return true;
      }
    });
    // console.log(bools.every((el) => el), bools);
    return bools.every((el) => el);
  };

  const tratarOpcoes = (opcao) => !selectedFilters
    .find((filtro) => opcao === filtro.column);

  return (
    <div>
      <div>
        <select
          value={ selected.column }
          onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
          name="column-filter"
          id="column-filter"
          data-testid="column-filter"
        >
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
          {['population', 'orbital_period', 'diameter',
            'rotation_period', 'surface_water']
            .filter(tratarOpcoes)
            .map((column) => (
              <option value={ column } key={ column }>
                {column}
              </option>
            ))}
        </select>
        <select
          value={ selected.comparison }
          onChange={ (e) => setSelected({ ...selected, comparison: e.target.value }) }
          name="comparison-filter"
          id="comparison-filter"
          data-testid="comparison-filter"
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          value={ selected.value }
          onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
          type="number"
          data-testid="value-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setSelectedFilters([...selectedFilters, selected]);
            setSelected({
              column: '',
              comparison: '',
              value: 0,
            });
          } }
        >
          Filtrar
        </button>
      </div>
      <br />
      <div>
        {selectedFilters.map((filter, index) => (
          <div data-testid="filter" className="filters" key={ index }>
            <button
              type="button"
              className="limpar"
              onClick={ () => {
                const cloneArray = [...selectedFilters];
                cloneArray.splice(index, 1);
                setSelectedFilters(cloneArray);
              } }
            >
              X
            </button>
            {filter.column}
            {filter.comparison}
            {filter.value}
          </div>
        ))}
      </div>
      <br />
      <label htmlFor="search">
        Procure por um planeta
        <input
          type="text"
          id="search"
          data-testid="name-filter"
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
            .filter((planet) => planet.name.toLowerCase()
              .match(nameFilter.toLowerCase()) && (tratarDados(planet)))
            // .filter(tratarDados)
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
