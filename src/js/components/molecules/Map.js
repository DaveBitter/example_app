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
    this.map = L.map('map-container', {
      attributionControl: false,
      zoomControl: false
    }).setView([15.505, -0.09], 2);

    L.tileLayer(
      'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
    ).addTo(this.map);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rawData !== this.state.data) {
      this.setState({ data: nextProps.rawData }, () => this.drawMarkers());
    }
  }

  drawMarkers() {
    const data = [].concat(this.state.data);
    const biggestPop = data.sort((a, b) => b.population - a.population)[0]
      .population;

    this.markerLayer = L.featureGroup(
      data.filter(datum => datum.latlng.length).map(datum => {
        const circle = {
          radius: datum.population / biggestPop * 30,
          color: '#FF5349'
        };

        return L.circleMarker(
          { lat: datum.latlng[0], lng: datum.latlng[1], name: datum.name },
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
