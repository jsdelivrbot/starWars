import React, { Component } from 'react';
import SearchBar from './searchBar';
import {Circle} from 'react-shapes';
import planetMap from '../../util';


export default class SearchPage extends Component {

    render() {
        let planetList = this.props.planetList;
        let noResult = this.props.showNoResultError;
        return (
            <div className="search-page">
                <img className="start-logo" src="images/starWarLogo.png"/>
                <SearchBar {...this.props}/>
                {
                    planetList.length > 0 ? <div>
                        {planetList.map((planet, index)=> {
                            return <div key={index}>
                                <div className="planets">
                                    <svg>
                                        <circle cx={"79"} cy={"75"} r={planet.diameter ? planet.diameter/200 > 80 ? 80 : planet.diameter/200: '50'}
                                                stroke="black" strokeWidth="2"
                                                fill={"#FF602A"}/>
                                    </svg>
                                </div>
                                <h3 style={{color: "#fff"}}>{planet.name}</h3>
                                <table className="table table-dark">
                                    <thead>
                                    <tr>
                                        <th>Population</th>
                                        <th>Diameter</th>
                                        <th>Orbital Period</th>
                                        <th>Rotation Period</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{planet.population}</td>
                                        <td>{planet.diameter}</td>
                                        <td>{planet.orbital_period}</td>
                                        <td>{planet.rotation_period}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>

                        })}
                    </div> : noResult ? <h3>NO RESULT FOUND</h3>: null
                }

            </div>
        );
    }
}