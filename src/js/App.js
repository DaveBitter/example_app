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
    API.getCities()
      .then(data => {
        if (data) this.handleData(data);
      })
      .catch(err => console.error(err));
  }

  handleData(countries) {
    this.setState({ rawData: countries }, () => {
      config.forEach(card => {
        if (card.chart) this.filterData(card.aggregate);
      });
    });
  }

  getTotal(countries) {
    return countries.reduce((total, next) => total + next.population, 0);
  }

  filterData(filter) {
    let data = [].concat(this.state.rawData);
    let filteredData = Object.assign(this.state.filteredData, {});

    switch (filter) {
      case 'totalPerRegion':
        const regions = {};
        data.forEach(datum => {
          if (regions[datum.region]) {
            regions[datum.region].push(datum);
          } else {
            regions[datum.region] = [datum];
          }
        });

        filteredData[filter] = Object.values(regions).map(region => {
          return {
            region: region[0].region,
            population: this.getTotal(region)
          };
        });

        break;
      case 'highPop':
        filteredData[filter] = data
          .sort((a, b) => b.population - a.population)
          .splice(0, 9);
        break;
      case 'lowPop':
        filteredData[filter] = data
          .sort((a, b) => a.population - b.population)
          .splice(0, 9);
        break;
      case 'highDense':
        filteredData[filter] = data
          .filter(datum => datum.area)
          .map(datum =>
            Object.assign(datum, { density: datum.population / datum.area })
          )
          .sort((a, b) => b.density - a.density)
          .splice(0, 9);
        break;
      case 'lowDense':
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

    this.setState({ data, filteredData });
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
