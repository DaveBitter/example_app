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
		aggregate: 'TotalPerRegion',
		datapoint: 'Population',
		type: 'chart',
		chart: {
			type: 'bar'
		}
	},
	{
		id: uuid.v4(),
		title: 'Population per Country',
		aggregate: 'TopCountries',
		datapoint: 'Population',
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
					key: 'highDense'
				},
				{
					label: 'Least dense population',
					key: 'lowDense'
				}
			]
		}
	}
];

export default config;
