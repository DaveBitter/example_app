/* ==============================================================
	Map component that will render the map based on
	the props it gets. Leaflet documentation: http://leafletjs.com/
============================================================== */

import React, { Component } from 'react';
import L from 'leaflet';

class Chart extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // Initialize the Leaflet map
    this.map = L.map('map-container', {
      attributionControl: false,
      zoomControl: false
    }).setView([15.505, -0.09], 2);

    // Add a custom dark tile layer to the Leaflet map
    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
    ).addTo(this.map);
  }

  componentWillReceiveProps(nextProps) {
    // Only draw markers if the next data is not equal to the data in the current state
    if (nextProps.rawData !== this.state.data) {
      this.setState({ data: nextProps.rawData }, () => this.drawMarkers());
    }
  }

  drawMarkers() {
    // Copy the data in the current state
    const data = [].concat(this.state.data);

    // See what the biggest population is to calculate the radius based on that biggest value
    const biggestPop = data.sort((a, b) => b.population - a.population)[0]
      .population;

    // Add a new Leaflet feature group with all the markers to the Leaflet map
    this.markerLayer = L.featureGroup(
      data.filter(datum => datum.latlng.length).map(datum => {
        const circle = {
          radius: datum.population / biggestPop * 30,
          color: '#FF5349'
        };

        // Return the marker with a latitude and longitude
        return L.circleMarker(
          { lat: datum.latlng[0], lng: datum.latlng[1] },
          circle
        );
      })
    ).addTo(this.map);
  }

  render() {
    return (
      <section>
        <article>
          <div ref="map" id="map-container" />
        </article>
        <article />
      </section>
    );
  }
}

export default Chart;
