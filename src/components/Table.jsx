import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext';
import planetsAPI from '../services/planetsAPI';

export default function Table() {
  const { data, setPlanets } = useContext(AppContext);

  useEffect(() => {
    async function fetching() {
      const fetchedPlanets = await planetsAPI();
      setPlanets(data.concat(fetchedPlanets.results));
      console.log(fetchedPlanets);
    }
    fetching();
  }, []);

  return (
    <div>
      This is our table
      {/* <ol>
        {
          data.map((planet) => <li key={ planet.name }>{ planet.name }</li>)
        }
      </ol> */}
      <table>
        <tr>
          {/* {
            data.map((planet) => <th key={ Object.keys }>{Object.keys}</th>)
          } */}
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
        <tr>
          {
            data.map((planet) => <td key={ planet.name }>{planet.name}</td>)
          }
        </tr>
      </table>
      {console.log(data)}
    </div>);
}