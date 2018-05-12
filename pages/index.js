import React, { Component } from 'react';
import Head from 'next/head'
import GoogleMapReact from 'google-map-react';
import { locations } from '../locations';
import { GMAPS_API_KEY } from '../config';
// const markerSrc = '../static/marker_2.svg';
// const markerSrc = '../static/blah_050916.png';
// const markerSrc = '../static/google_place_icon_24.png';
const markerSrc = '../static/mapIcon.svg';

const mapCenter = {lat: 38.91131141655464, lng: -77.04375138092037};
const markerCredit = 'Map Markers by Viktor Vorobyev from the Noun Project'
const MARKER_SIZE = 34;

const markerStyle = {
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  width: 20,
  height: 26.122,
  willChange: 'transform',
	transform: 'translate(-10px, -26.122px)' // negate half the width, negate the entire height
}

const AnyReactComponent = ({ id, handler }) => (
	<img className='marker-svg' onClick={()=>handler(id)} src={markerSrc} fill={'#666'} style={{ ...markerStyle }} />
)

const markers = ( locations, handler ) => {
  return locations.map(location => (
    <AnyReactComponent
      id={location.id}
			handler={handler}
      key={location.id}
      lat={location.lat}
      lng={location.lng}
    />
  ))
}

class SimpleMap extends Component {
  static defaultProps = {
    center: mapCenter,
    zoom: 16
  };

	_distanceToMouse = (markerPos, mousePos, markerProps) => {
    const x = markerPos.x;
    // because of marker non symmetric,
    // we transform it central point to measure distance from marker circle center
    // you can change distance function to any other distance measure
    const y = markerPos.y - 26.122 / 2;

    return Math.sqrt((x - mousePos.x) * (x - mousePos.x) + (y - mousePos.y) * (y - mousePos.y));
  } 

	_handleClick = id => console.log(`${id} clicked`)

  render() {
    return (
      <div>
			<Head>
				<title>Next.js & google-map-react</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: GMAPS_API_KEY }}
          defaultZoom={this.props.zoom}
          defaultCenter={this.props.center}
          // THESE DON'T APPEAR NECESSARY
					// hoverDistance={26.122/2}
					// distanceToMouse={this._distanceToMouse}
        >
					{markers(locations, this._handleClick)}
        </GoogleMapReact>
				<span style={{transform: 'translateZ(1px)', position: 'absolute', top: 13, left: 5, fontSize: 13, color: 'rgb(95, 158, 160)'}}> {markerCredit} </span>
				<style jsx global>{`
					body { 
						margin: 0;
					}
				`}</style>
      </div>
      </div>
    );
  }
}

export default SimpleMap;
