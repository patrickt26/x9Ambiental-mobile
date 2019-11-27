import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import api from '../../services/api';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#66cdaa',
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

function Map({ isFocused, navigation }) {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [reports, setReports] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates(coords);
        setLoading(false);
      },
      error => {
        // console.tron.log(error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );

    Geolocation.watchPosition(
      ({ coords }) => {
        setCoordinates(coords);
      },
      error => {
        // console.tron.log(error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 1000,
        distanceFilter: 10,
      }
    );
  }, []);

  async function getData() {
    const { data } = await api.get('/reports');

    setReports(data);
  }

  useEffect(() => {
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  function renderReports() {
    return reports.map(item => (
      <Marker
        key={item.id}
        coordinate={{
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        }}
        title={`Tipo de crime: ${item.crime_type}`}
        description={`Área afetada: ${item.crime_zone}`}
        onCalloutPress={() => {
          navigation.navigate('ReportDetail', { item });
        }}
      />
    ));
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          initialRegion={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          }}
          style={styles.map}
          showsUserLocation
        >
          {renderReports()}
        </MapView>
      )}
    </View>
  );
}

Map.navigationOptions = {
  tabBarLabel: 'Mapa',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="map" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Map);
