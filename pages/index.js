import React, { Component } from 'react';
import Head from 'next/head'
import GoogleMapReact from 'google-map-react';
import { locations } from '../locations';
import { GMAPS_API_KEY } from '../config';
import MyGreatPlaceWithHover from '../components/my_great_place_with_hover';
import { K_SIZE } from '../components/my_great_place_with_hover_styles';

const mapCenter = {lat: 38.91131141655464, lng: -77.04375138092037};
const marker = ({id}) => ( <div key={id} style={markerStyle}>
														{id}
													</div> )

const markers = ( locations, handler ) => {
  return locations.map(location => (
    <MyGreatPlaceWithHover
      text={location.id}
      lat={location.lat}
      lng={location.lng}
    />
  ))
}

class SimpleHoverMap extends Component {
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
          hoverDistance={K_SIZE / 2}
        >
					{markers(locations)}
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

export default SimpleHoverMap;
