import React, { Component } from 'react';
import Head from 'next/head'
import GoogleMapReact from 'google-map-react';
import { locations } from '../locations';
import { GMAPS_API_KEY } from '../config';

const mapCenter = {lat: 38.91131141655464, lng: -77.04375138092037};
const markerCredit = 'Map Marker by Viktor Vorobyev from the Noun Project'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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
          {locations.map( location => 
            ( <AnyReactComponent {...location} text={location.id} key={location.id} /> )
          )}
        </GoogleMapReact>
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
