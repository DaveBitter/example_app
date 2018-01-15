/* ==============================================
	High order component that handles all logic and
	passes down all props.
============================================== */

import React, { Component } from 'react';
import '../css/App.css';
import config from '../config.js';
import API from './lib/API.js';
import Card from './components/organisms/Card.js';

class App extends Component {
  state = {
    rawData: [],
    filteredData: {}
  };

  componentWillMount() {
    // Get all the countries from the API
    API.getCountries()
      .then(data => {
        // Handle the data if there is any
        if (data) this.handleData(data);
      })
      .catch(err => console.error(err));
  }

  handleData(countries) {
    // Save the data in the state for later use
    this.setState({ rawData: countries }, () => {
      // Filter the data for the card's default aggregate
      config.forEach(card => {
        if (card.chart) this.filterData(card.aggregate);
      });
    });
  }

  getTotal(countries) {
    // Reduce the population to a single value
    return countries.reduce((total, next) => total + next.population, 0);
  }

  filterData(filter) {
    // Create a copy of the raw data and the filtered data in the current state
    let data = [].concat(this.state.rawData);
    let filteredData = Object.assign(this.state.filteredData, {});

    switch (filter) {
      case 'totalPerRegion':
        const regions = {};
        // Create an object with a key for each region (continent) that has an array with all
        // the countries in that region
        data.forEach(datum => {
          // Push the country to the region's array if it is defined, otherwise add it
          if (regions[datum.region]) {
            regions[datum.region].push(datum);
          } else {
            regions[datum.region] = [datum];
          }
        });

        // Update the array in the filtered data object with the array with the total per region
        filteredData[filter] = Object.values(regions).map(region => {
          // Get the total population for each region
          return {
            region: region[0].region,
            population: this.getTotal(region)
          };
        });
        break;
      case 'highPop':
        // Update the array in the filtered data object with the 10 countries with the highest population
        filteredData[filter] = data
          .sort((a, b) => b.population - a.population)
          .splice(0, 9);
        break;
      case 'lowPop':
        // Update the array in the filtered data object with the 10 countries with the lowest population
        filteredData[filter] = data
          .sort((a, b) => a.population - b.population)
          .splice(0, 9);
        break;
      case 'highDense':
        // Update the array in the filtered data object with the 10 countries with the highest density
        filteredData[filter] = data
          .filter(datum => datum.area)
          .map(datum =>
            Object.assign(datum, { density: datum.population / datum.area })
          )
          .sort((a, b) => b.density - a.density)
          .splice(0, 9);
        break;
      case 'lowDense':
        // Update the array in the filtered data object with the 10 countries with the lowest density
        filteredData[filter] = data
          .filter(datum => datum.area)
          .map(datum =>
            Object.assign(datum, { density: datum.population / datum.area })
          )
          .sort((a, b) => a.density - b.density)
          .splice(0, 9);
        break;
      default:
        break;
    }

    // Update the filtered data in the current state with the updated filtered data object
    this.setState({ filteredData });
  }

  render() {
    return (
      <section>
        {config.map(card => (
          <Card
            key={card.id}
            datapoint={this.state.datapoint}
            rawData={this.state.rawData}
            filteredData={this.state.filteredData}
            filterData={filter => this.filterData(filter)}
            {...card}
          />
        ))}
      </section>
    );
  }
}

export default App;
