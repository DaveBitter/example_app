const BASEURL = 'https://restcountries.eu/rest/v2';

const API = {
	getCities: async () => {
		return await fetch(`${BASEURL}/all`, {
			method: 'GET'
		})
			.then(response => {
				if (response.status !== 200) {
					console.error(`Failed to fetch data with error: ${response.status}`);
					return null;
				}
				console.log('Finished fetching data');
				return response.json();
			})
			.catch(err => console.error(err));
	}
};

export default API;
