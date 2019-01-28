import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import stateData from '../assets/modified_states.json';
import countyData from '../assets/modified_counties.json';
import Tooltip from './Tooltip';
import '../styles/Map.css';
import 'react-rangeslider/lib/index.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const colorScale = {
  state: {
    total: [[0, '#fff7fb'],
      [100000, '#ece7f2'],
      [200000, '#d0d1e6'],
      [400000, '#a6bddb'],
      [800000, '#74a9cf'],
      [1600000, '#3690c0'],
      [3200000, '#0570b0'],
      [6400000, '#045a8d'],
      [12800000, '#023858']], 
    fraction: [[0, '#fff7fb'],
      [0.005, '#ece7f2'],
      [0.01, '#d0d1e6'],
      [0.015, '#a6bddb'],
      [0.02, '#74a9cf'],
      [0.025, '#3690c0'],
      [0.03, '#0570b0'],
      [0.035, '#045a8d'],
      [0.04, '#023858']], 
    perCapita: [[0, '#fff7fb'],
      [0.05, '#ece7f2'],
      [0.1, '#d0d1e6'],
      [0.15, '#a6bddb'],
      [0.2, '#74a9cf'],
      [0.25, '#3690c0'],
      [0.3, '#0570b0'],
      [0.35, '#045a8d'],
      [0.4, '#023858']],
  },
  county:{
    total: [[0, '#fff7fb'],
      [1250, '#ece7f2'],
      [2500, '#d0d1e6'],
      [5000, '#a6bddb'],
      [10000, '#74a9cf'],
      [20000, '#3690c0'],
      [40000, '#0570b0'],
      [80000, '#045a8d'],
      [160000, '#023858']], 
    fraction: [[0, '#fff7fb'],
      [0.0125, '#ece7f2'],
      [0.025, '#d0d1e6'],
      [0.05, '#a6bddb'],
      [0.1, '#74a9cf'],
      [0.2, '#3690c0'],
      [0.4, '#0570b0'],
      [0.8, '#045a8d'],
      [1.6, '#023858']], 
    perCapita: [[0, '#fff7fb'],
      [0.5, '#ece7f2'],
      [1, '#d0d1e6'],
      [1.5, '#a6bddb'],
      [2, '#74a9cf'],
      [2.5, '#3690c0'],
      [3, '#0570b0'],
      [3.5, '#045a8d'],
      [4, '#023858']],
  },
};




export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: 'state',
      active: this.options[0],
    };

  }

  options = [{
    name: 'Total',
    description: 'Dollars',
    property: 'correct_total_exp',
    stops: colorScale[this.state ? this.state.location : 'state'].total,
  }, 
  {
    name: 'Vs. All Expenditures',
    description: 'Percent',
    property: 'correct_as_fraction_of_total_exp',
    stops: colorScale[this.state ? this.state.location : 'state'].fraction,
  },
  {
    name: 'Per Capita',
    description: 'Deaths per 100,000',
    property: 'correct_per_capita',
    stops: colorScale[this.state ? this.state.location : 'state'].perCapita,
  }];

  setTooltip(features, active, year) {
    if (features.length && features[0].properties && features[0].properties.GEO_ID) {
      ReactDOM.render(
        React.createElement(
          Tooltip, {
            features,
            active,
            year,
          }
        ),
        this.tooltipContainer
      );
      this.tooltipContainer.style.display = 'block';
    } else {
      ReactDOM.unmountComponentAtNode(this.tooltipContainer);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.state !== prevState){
      this.setFill();
    }
    
  }

  componentDidMount() {
    console.log(stateData);
    this.tooltipContainer = document.createElement('div');

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-98, 38.88],
      minZoom: 3,
      zoom: 3,
    });

    var zoomThreshold = 4;

    this.map.on('load', () => {
      this.map.addSource('states', {
        type: 'geojson',
        data: stateData,
      });

      this.map.addSource('counties', {
        type: 'geojson',
        data: countyData,
      });

      this.map.addLayer({
        id: 'states',
        type: 'fill',
        source: 'states',
        maxzoom: zoomThreshold,
        // filter: ['==', 'isState', true],
        paint: {
          'fill-opacity': 0,
          'fill-opacity-transition': {
            'duration': 2000,
          },
        },
      });

      this.map.addLayer({
        id: 'counties',
        type: 'fill',
        source: 'counties',
        minzoom: zoomThreshold,
        // filter: ['==', 'isCounty', true],
        // paint: {
        //   'fill-opacity': 0,
        //   'fill-opacity-transition': {
        //     'duration': 2000,
        //   },
        // },
      });

      // Remove lables
      this.map.style.stylesheet.layers.forEach(layer => {
        if (layer['source-layer'] === 'place_label' || layer['source-layer'] === 'state_label') {
          this.map.removeLayer(layer.id);
        }
      });

      // The feature-state dependent fill-opacity expression will render the hover effect
      // when a feature's hover state is set to true.
      this.map.addLayer({
        'id': 'state-fills',
        'type': 'fill',
        'source': 'states',
        'layout': {},
        'paint': {
          'fill-color': '#08306b',
          'fill-opacity': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0,
          ],
        },
      });

      this.map.addLayer({
        'id': 'county-fills',
        'type': 'fill',
        'source': 'counties',
        'layout': {},
        'minzoom': zoomThreshold,
        'paint': {
          'fill-color': '#08306b',
          'fill-opacity': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0,
          ],
        },
      });

      this.map.addLayer({
        'id': 'state-borders',
        'type': 'line',
        'source': 'states',
        'layout': {},
        'paint': {
          'line-color': 'black',
          'line-width': 1.4,
          'line-opacity': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            0.9,
            0.2,
          ],
        },
      });

      this.map.addLayer({
        'id': 'county-borders',
        'type': 'line',
        'source': 'counties',
        'layout': {},
        'minzoom': zoomThreshold,
        'paint': {
          'line-color': 'black',
          'line-width': 1.4,
          'line-opacity': ['case',
            ['boolean', ['feature-state', 'hover'], false],
            0.9,
            0.2,
          ],
        },
      });

      // Need to put ids on legend (separate for state/county)
      var stateLegendEl = document.getElementById('state-legend');
      var countyLegendEl = document.getElementById('county-legend');
      this.map.on('zoom', () => {
        if (this.state.location === 'state' && this.map.getZoom() > zoomThreshold) {
          let location = 'county';
          this.setState({location});
          stateLegendEl.style.display = 'none';
          countyLegendEl.style.display = 'block';
        } 
        if (this.state.location === 'county' && this.map.getZoom() < zoomThreshold) {
          let location = 'state';
          this.setState({location});
          stateLegendEl.style.display = 'block';
          countyLegendEl.style.display = 'none';
        } 
        // else {
        //     stateLegendEl.style.display = 'block';
        //     countyLegendEl.style.display = 'none';
        //   }
      });

      this.setFill();
    });

    const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
      offset: [-90, 0],
    }).setLngLat([0,0]).addTo(this.map);
    
    this.map.on('mousemove', e => {
      const features = this.map.queryRenderedFeatures(e.point);
      tooltip.setLngLat(e.lngLat);
      this.map.getCanvas().style.cursor = features.length ? 'pointer' : '';
      this.setTooltip(features, this.state.active, this.state.value);
    });

    // this.map.on('click', e => {
    //   const features = this.map.queryRenderedFeatures(e.point);
    //   if(features[0].properties.opioid_data_location_id){
    //     this.props.fetchStateData(features[0].properties.opioid_data_location_id);
    //   }
    // });

    // When the user moves their mouse over the state-fill layer, we'll update the
    // feature state for the feature under the mouse.
    this.map.on('mousemove', 'state-fills', e => {
      if(e.features.length > 0) {
        if(this.state.hoveredStateId) {
          this.map.setFeatureState({source: 'states', id: this.state.hoveredStateId}, { hover: false});
        }

        let hoveredStateId = e.features[0].id;
        this.setState({hoveredStateId});

        if(this.state.hoveredStateId) {
          this.map.setFeatureState({source: 'states', id: this.state.hoveredStateId}, { hover: true});
        }
      }
    });

    // When the mouse leaves the state-fill layer, update the feature state of the
    // previously hovered feature.
    this.map.on('mouseleave', 'state-fills', () => {
      if (this.state.hoveredStateId) {
        this.map.setFeatureState({source: 'states', id: this.state.hoveredStateId}, { hover: false});
      }
      let hoveredStateId = null;
      this.setState({hoveredStateId});
    });
  }

  setFill() {
    const { property, stops } = this.state.active;

    // setTimeout(() => {
    //   this.map.setPaintProperty('states', 'fill-opacity', 1);
    // }, 500);
    
    if(this.state.location == 'state'){
      setTimeout(() => {
        this.map.setPaintProperty('states', 'fill-opacity', 1);
      }, 500);
      this.map.setPaintProperty('states', 'fill-color', {
        property,
        stops,
      });   
    }
    else{
      setTimeout(() => {
        this.map.setPaintProperty('counties', 'fill-opacity', 1);
      }, 500);
      this.map.setPaintProperty('counties', 'fill-color', {
        property,
        stops,
      }); 
    }
    
  }

  render() {
    const { name, description, stops, property } = this.state.active;
    console.log(this.state);
    // console.log(this.options);
    // console.log(countyData);
    const renderLegendKeys = (stop, i) => {
      if(stop[0] <= Math.max.apply(null, stops.map(el=>el[0]))){
        return (
          <div key={i} className='txt-s'>
            <span className='mr6 round-full w12 h12 inline-block align-middle' id={i} style={{ backgroundColor: stop[1] }} />
            {/* <span className='mr6 round-full w12 h12 inline-block align-middle' id={i} onMouseOver={e=>this.handleLegendHover(e)} style={{ backgroundColor: stop[1] }} /> */}
            <span>{`${stop[0].toLocaleString()}`}</span>
          </div>
        );
      }
    };  

    const renderOptions = (option, i) => {

      return (
        <label key={i} className="toggle-container">
          <input 
            onChange={() => this.setState({ active: this.options[i] })} 
            checked={option.property === property} 
            name="toggle" 
            type="radio" />
          <div className="toggle txt-s py3 toggle--active-white">{option.name}</div>
        </label>
      );
    };
    // let legendLoc = this.state.location['state'] ? 'county-legend' : 'state-legend';
    // if (this.state.location === 'state'){
    //   legendLoc = 'state-legend';
    // } else {
    //   legendLoc = 'county-legend';
    // }
    

    const renderedMap = <div ref={el => this.mapContainer = el} className="relative animation-fade-in fade-in">
      <div className="toggle-group absolute top left ml12 mt12 border border--2 border--white bg-white shadow-darken10 z1">
        {this.options.map(renderOptions)}
      </div>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180" id='state-legend'>
        <div className='mb6'>
          <h2 className="txt-bold txt-s block legend-title">{name}</h2>
          <p className='txt-s color-gray'>{description}</p>
        </div>
        {stops.map(renderLegendKeys)}
        <div key={100} className='txt-s'>
          <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: 'black' }} />
          <span>{`No Data`}</span>
        </div>
      </div>
      <div className="bg-white absolute bottom right mr12 mb24 py12 px12 shadow-darken10 round z1 wmax180" id='county-legend'>
        <div className='mb6'>
          <h2 className="txt-bold txt-s block legend-title">{name}</h2>
          <p className='txt-s color-gray'>{description}</p>
        </div>
        {stops.map(renderLegendKeys)}
        <div key={100} className='txt-s'>
          <span className='mr6 round-full w12 h12 inline-block align-middle' style={{ backgroundColor: 'black' }} />
          <span>{`No Data`}</span>
        </div>
      </div>
    </div>;

    
      
    return (
      <React.Fragment>
        <div className="map-header">
          <h2 className="map-header-text">Click on a state to view its infographic.</h2>
        </div>
        {renderedMap}
      </React.Fragment>
    );
  }
}
