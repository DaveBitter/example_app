import React, { Component } from 'react';
import c3 from 'c3';
import numeral from 'numeral';

class Chart extends Component {
  state = {
    activeFilter: null,
    datapoint: null
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
    return [].concat(
      ['data'],
      data.map(datum => datum[this.state.datapoint || 'population'])
    );
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.activeFilter)
      this.setState({
        activeFilter: nextProps.chart.filters
          ? nextProps.chart.filters[0].key
          : nextProps.aggregate
      });
  }

  componentDidUpdate() {
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
