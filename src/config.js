/* =====================================================
	Config file to render all component and subcomponents.
===================================================== */

import uuid from 'uuid';

const config = [
  {
    id: uuid.v4(),
    type: 'map',
    subComponents: [
      {
        id: uuid.v4(),
        type: 'statBar',
        datapoints: [
          {
            key: 'countries'
          },
          {
            key: 'population'
          },
          {
            key: 'area',
            postfix: 'square miles'
          },
          {
            key: 'languages'
          }
        ]
      }
    ]
  },
  {
    id: uuid.v4(),
    title: 'Population per Continent',
    aggregate: 'totalPerRegion',
    datapoint: 'population',
    type: 'chart',
    chart: {
      type: 'bar'
    }
  },
  {
    id: uuid.v4(),
    title: 'Population per Country',
    aggregate: 'highPop',
    datapoint: 'population',
    type: 'chart',
    chart: {
      type: 'bar',
      filters: [
        {
          label: 'Highest population',
          key: 'highPop'
        },
        {
          label: 'Lowest population',
          key: 'lowPop'
        },
        {
          label: 'Most dense population',
          key: 'highDense',
          datapoint: 'density'
        },
        {
          label: 'Least dense population',
          key: 'lowDense',
          datapoint: 'density'
        }
      ]
    }
  }
];

export default config;
