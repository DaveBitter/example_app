/* ===============================================
	API object to fetch data from external REST API.
=============================================== */

const BASEURL = 'https://restcountries.eu/rest/v2';

const API = {
  // Get all countries from the external API (+- 250 countries)
  getCountries: async () => {
    // Await response from APi call before returning data
    return await fetch(`${BASEURL}/all`, {
      method: 'GET'
    })
      .then(response => {
        // Show error in console unless the status code is 200
        if (response.status !== 200) {
          console.error(`Failed to fetch data with error: ${response.status}`);
          return null;
        }
        return response.json();
      })
      .catch(err => console.error(err));
  }
};

export default API;
