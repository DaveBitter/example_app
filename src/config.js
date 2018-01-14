import uuid from 'uuid';

const config = [
	{
		id: uuid.v4()
	},
	{
		id: uuid.v4(),
		title: 'Population per Continent',
		aggregate: 'TotalPerRegion',
		datapoint: 'Population',
		chart: {
			type: 'bar'
		}
	},
	{
		id: uuid.v4(),
		title: 'Population per Country',
		aggregate: 'TopCountries',
		datapoint: 'Population',
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
