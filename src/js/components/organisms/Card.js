/* =============================================
	Card component that will render components and
	sub components based on the config it gets.
============================================= */

import React, { Component } from 'react';
import Chart from '../molecules/Chart.js';
import Map from '../molecules/Map.js';
import StatBar from '../molecules/StatBar.js';

class Card extends Component {
  render() {
    return (
      <article className="card fade-in">
        {this.props.title ? (
          <header>
            <h1>{this.props.title}</h1>
          </header>
        ) : null}
        <main>
          {this.props.type === 'chart' ? <Chart {...this.props} /> : null}
          {this.props.type === 'map' ? <Map {...this.props} /> : null}
          {this.props.subComponents
            ? this.props.subComponents.map(component => {
                return component.type === 'statBar' ? (
                  <StatBar
                    key={component.id}
                    data={this.props.rawData}
                    filteredData={this.props.filteredData}
                    {...component}
                  />
                ) : null;
              })
            : null}
        </main>
      </article>
    );
  }
}

export default Card;
