import React, { Component } from 'react';
import Head from 'next/head'
import GoogleMapReact from 'google-map-react';
import { GMAPS_API_KEY } from '../config';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
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
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text={'Kreyser Avrora'}
          />
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
