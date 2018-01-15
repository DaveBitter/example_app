import React, { Component } from 'react';
import { uniq } from 'underscore';
import numeral from 'numeral';

class StatBar extends Component {
	state = {
		data: null,
		stats: {}
	};

	componentWillReceiveProps(nextProps) {
		if (this.state.data !== nextProps.data) {
			this.setState({ data: nextProps.data }, () =>
				nextProps.datapoints.map(datapoint => this.getStats(datapoint))
			);
		}
	}

	getStats(datapoint) {
		const data = [].concat(this.state.data);
		const stats = Object.assign(this.state.stats, {});
		let value = '-';
		switch (datapoint.key) {
			case 'countries':
				value = data.length;
				break;
			case 'population':
				value = data.reduce((total, next) => total + next.population, 0);
				break;
			case 'area':
				value = data
					.filter(datum => datum.area)
					.reduce((total, next) => total + next.area, 0);
				break;
			case 'languages':
				const languages = [].concat(...data.map(datum => datum.languages));
				value = uniq(languages, language => language.name).length;
				break;
			default:
				break;
		}

		stats[datapoint.key] = value;

		this.setState({ stats });
	}

	render() {
		return (
			<section>
				<article className="stats-container">
					{this.props.datapoints.map(datapoint => {
						return (
							<div key={datapoint.key} className="stat">
								<label>{datapoint.key}</label>
								<span>
									{this.state.stats[datapoint.key]
										? numeral(this.state.stats[datapoint.key]).format('0a')
										: '-'}
								</span>
								{datapoint.postfix ? <sup>{datapoint.postfix}</sup> : null}
							</div>
						);
					})}
				</article>
			</section>
		);
	}
}

export default StatBar;
