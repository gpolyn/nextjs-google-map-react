import React, { Component } from 'react';
import Head from 'next/head'
import GoogleMapReact from 'google-map-react';
import { locations } from '../locations';
import { GMAPS_API_KEY } from '../config';

const mapCenter = {lat: 38.91131141655464, lng: -77.04375138092037};
const markerCredit = 'Map Markers by Viktor Vorobyev from the Noun Project'
const MARKER_SIZE = 34;
const placeStyle = {
  position: 'absolute',
	transform: 'translate(-50%, -50%)'
}
// const markerSrc = '../static/marker_2.svg';
const markerSrc = '../static/blah_050916.png';

// const markerStyle = { display: 'inline-block', height: MARKER_SIZE, width: MARKER_SIZE, cursor: 'pointer', transform: 'translate(-25%,-100%)'}
const markerStyle = { ...placeStyle, display: 'inline-block', cursor: 'pointer' }
const marker = ({id}) => ( <div key={id} style={markerStyle}>
														{id}
													</div> )
// const AnyReactComponent = ({ id }) => (
//     <img className='marker-svg' src={markerSrc} fill={'#666'} style={{ ...markerStyle, width: MARKER_SIZE, height: MARKER_SIZE}} />
// )

const AnyReactComponent = ({ id }) => (
    <img className='marker-svg' src={markerSrc} fill={'#666'} style={{ ...markerStyle }} />
)
const markers = ( locations, handler ) => {
  return locations.map(location => (
    <AnyReactComponent
      text={location.id}
      id={location.id}
      key={location.id}
      lat={location.lat}
      lng={location.lng}
    />
  ))
}

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: mapCenter,
    zoom: 16
  };

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
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
					{markers(locations)}
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
