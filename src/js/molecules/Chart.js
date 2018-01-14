import React, { Component } from 'react';
import c3 from 'c3';

class Chart extends Component {
	state = {
		data: null
	};

	componentDidMount() {
		this.chart = c3.generate({
			bindto: this.refs.chart,
			color: {
				pattern: ['#FF5349', '#292C44', '#18CDCA', '#4F80E1', '#4F80E1']
			},
			axis: {
				x: {
					type: 'category',
					categories: [],
					tick: {
						format: x =>
							this.state.data[x].alpha3Code || this.state.data[x].region
					}
				},
				y: {
					tick: {
						format: y => this.formatNumber(y)
					}
				}
			},
			data: {
				type: this.props.chart.type || 'bar',
				columns: []
			},
			legend: {
				show: false
			},
			tooltip: {
				show: false
			}
		});
	}

	formatData(data) {
		return [].concat(
			[this.props.datapoint],
			data.map(datum => datum[this.state.datapoint || 'population'])
		);
	}

	formatNumber(number) {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	filterData(filter) {
		let data = [].concat(this.props.rawData);
		let datapoint = 'population';
		console.log(
			data.sort((a, b) => b.population / b.area - a.population / a.area)
		);
		switch (filter) {
			case 'highPop':
				data = data.sort((a, b) => b.population - a.population).splice(0, 9);
				break;
			case 'lowPop':
				data = data.sort((a, b) => a.population - b.population).splice(0, 9);
				break;
			case 'highDense':
				data = data
					.filter(datum => datum.area)
					.map(datum =>
						Object.assign(datum, { density: datum.population / datum.area })
					)
					.sort((a, b) => b.density - a.density)
					.splice(0, 9);
				datapoint = 'density';
				break;
			case 'lowDense':
				data = data
					.filter(datum => datum.area)
					.map(datum =>
						Object.assign(datum, { density: datum.population / datum.area })
					)
					.sort((a, b) => a.population / a.area - b.population / b.area)
					.splice(0, 9);
				datapoint = 'density';
				break;
			default:
				break;
		}
		console.log(data);
		this.setState({ data, datapoint, activeFilter: filter });
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.state.data) {
			this.setState({
				data: nextProps.data
			});
		}

		if (nextProps.chart.filters) {
			this.setState({
				activeFilter: nextProps.chart.filters[0].key
			});
		}
	}

	componentDidUpdate() {
		if (this.state.data) {
			this.chart.load({
				columns: [this.formatData(this.state.data)],
				axis: {
					x: {
						categories: this.state.data.map(datum => datum.alpha3Code)
					}
				}
			});
		}
	}

	render() {
		return (
			<section>
				<article>
					<div className="chart" ref="chart" />
				</article>
				<article>
					<div className="filters">
						{this.props.chart.filters
							? this.props.chart.filters.map(filter => {
									return (
										<button
											key={filter.key}
											className={
												this.state.activeFilter === filter.key ? 'active' : ''
											}
											onClick={() => this.filterData(filter.key)}
										>
											{filter.label}
										</button>
									);
								})
							: null}
					</div>
				</article>
			</section>
		);
	}
}

export default Chart;
