import React, { Component } from 'react';
import Chart from '../molecules/Chart.js';
import Map from '../molecules/Map.js';

class Card extends Component {
	render() {
		return (
			<article className="card">
				{this.title ? (
					<header>
						<h1>{this.props.title}</h1>
					</header>
				) : null}
				<main>
					{this.props.chart ? (
						<Chart {...this.props} />
					) : (
						<Map {...this.props} />
					)}
				</main>
			</article>
		);
	}
}

export default Card;
