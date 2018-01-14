import React, { Component } from 'react';
import '../css/App.css';
import config from '../config.js';
import API from './lib/API.js';
import Card from './organisms/Card.js';

class App extends Component {
	state = {
		data: {},
		rawData: []
	};

	componentWillMount() {
		API.getCities()
			.then(data => {
				if (data) this.handleData(data);
			})
			.catch(err => console.error(err));
	}

	handleData(countries) {
		config.forEach(card => {
			if (card.chart) {
				const data = Object.assign(this.state.data, {});

				data[card.aggregate] = this[`get${card.aggregate}`](countries);

				this.setState({ data: data, rawData: countries });
			} else {
				console.log('app.js', countries);
				this.setState({ rawData: countries });
			}
		});
	}

	getTotal(countries) {
		return countries.reduce((total, next) => total + next.population, 0);
	}

	getTopCountries(countries) {
		const data = JSON.parse(JSON.stringify(countries));
		return data.sort((a, b) => b.population - a.population).splice(0, 9);
	}

	getTotalPerRegion(countries) {
		const regions = {};
		countries.forEach(country => {
			if (regions[country.region]) {
				regions[country.region].push(country);
			} else {
				regions[country.region] = [country];
			}
		});

		return Object.values(regions).map(region => {
			return {
				region: region[0].region,
				population: this.getTotal(region)
			};
		});
	}

	render() {
		return (
			<section>
				{config.map(card => (
					<Card
						key={card.id}
						data={this.state.data[card.aggregate]}
						rawData={this.state.rawData}
						{...card}
					/>
				))}
			</section>
		);
	}
}

export default App;
