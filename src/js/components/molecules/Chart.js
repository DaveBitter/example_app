/* =======================================================
	Chart component that will render a chart based on
	the props it gets. C3.js documentation: http://c3js.org/
======================================================= */

import React, { Component } from 'react';
import c3 from 'c3';
import numeral from 'numeral';

class Chart extends Component {
  state = {
    activeFilter: null,
    datapoint: null
  };

  componentDidMount() {
    // Initialize the C3.js chart
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
              this.props.filteredData[this.state.activeFilter][x].alpha3Code ||
              this.props.filteredData[this.state.activeFilter][x].region
          }
        },
        y: {
          tick: {
            format: y => numeral(y).format('0a')
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
    // Create a dataset with the values for the datapoint in the current state
    return [].concat(
      ['data'],
      data.map(datum => datum[this.state.datapoint || 'population'])
    );
  }

  componentWillReceiveProps(nextProps) {
    // Only update the active filter if it is different from the filter in the current state
    // so the chart doesn't redraw unnecessary
    if (!this.state.activeFilter)
      this.setState({
        activeFilter: nextProps.chart.filters
          ? nextProps.chart.filters[0].key
          : nextProps.aggregate
      });
  }

  componentDidUpdate() {
    // Load the data in the chart if it is available
    if (this.props.filteredData[this.state.activeFilter]) {
      this.chart.load({
        columns: [
          this.formatData(this.props.filteredData[this.state.activeFilter])
        ],
        axis: {
          x: {
            categories: this.props.filteredData[this.state.activeFilter].map(
              datum => datum.alpha3Code
            )
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
                      onClick={() =>
                        this.setState(
                          {
                            activeFilter: filter.key,
                            datapoint: filter.datapoint || 'population'
                          },
                          () => this.props.filterData(filter.key)
                        )
                      }
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
