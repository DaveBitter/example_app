/* ==============================================
	Statsbar component that will render stats based
	on the props it gets.
============================================== */

import React, { Component } from 'react';
import { uniq } from 'underscore';
import numeral from 'numeral';

class StatBar extends Component {
  state = {
    data: null,
    stats: {}
  };

  componentWillReceiveProps(nextProps) {
    // Only update the data in the current state if it has changed
    if (this.state.data !== nextProps.data) {
      this.setState({ data: nextProps.data }, () =>
        nextProps.datapoints.map(datapoint => this.getStats(datapoint))
      );
    }
  }

  // TODO: move this logic up to App.js to keep this component dumb
  getStats(datapoint) {
    // Create a copy of the the data and stats in the current state
    const data = [].concat(this.state.data);
    const stats = Object.assign(this.state.stats, {});
    let value = '-';

    switch (datapoint.key) {
      case 'countries':
        // Get the length of the countries which is the amount amount a countries
        value = data.length;
        break;
      case 'population':
        // Reduce the population of all the countries to a single value
        value = data.reduce((total, next) => total + next.population, 0);
        break;
      case 'area':
        // Reduce the area of all the countries that have it in the data to a single value
        value = data
          .filter(datum => datum.area)
          .reduce((total, next) => total + next.area, 0);
        break;
      case 'languages':
        // Create a copy of the all the languages for all the countries
        // and create a single level array out of it by using spreak
        const languages = [].concat(...data.map(datum => datum.languages));
        // Remove all the duplicate languages
        value = uniq(languages, language => language.name).length;
        break;
      default:
        break;
    }

    // Update the value in the stats object for the datapoint
    stats[datapoint.key] = value;

    // Update the stats object in the current state with the updated stats object
    this.setState({ stats });
  }

  render() {
    return (
      <section>
        <article className="stats-container fade-in-late">
          {this.props.datapoints.map(datapoint => {
            return (
              <div key={datapoint.key} className="stat">
                <label>{datapoint.key}</label>
                <span className="fade-in-last">
                  {this.state.stats[datapoint.key]
                    ? numeral(this.state.stats[datapoint.key]).format('0a')
                    : '-'}
                </span>
                {datapoint.postfix ? (
                  <sup className="fade-in-last">{datapoint.postfix}</sup>
                ) : null}
              </div>
            );
          })}
        </article>
      </section>
    );
  }
}

export default StatBar;
