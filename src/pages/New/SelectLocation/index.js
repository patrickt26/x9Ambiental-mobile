import React, { useState, useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MapView, { Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';

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

function SelectLocation({ navigation }) {
  const crimeType = navigation.getParam('crimeType');
  const crimeZone = navigation.getParam('crimeZone');

  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  // const [newCoordinates, setNewCoordinates] = useState({});
  // const [distance, setDistance] = useState({});

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoordinates(coords);
        setLoading(false);
      },
      error => {
        console.tron.log(error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );
  }, []);

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
          onPress={event => {
            const newCoordinates = event.nativeEvent.coordinate;
            const distance = getDistance(
              {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude,
              },
              {
                latitude: newCoordinates.latitude,
                longitude: newCoordinates.longitude,
              }
            );

            if (distance > 1000) {
              return Alert.alert(
                'Atenção',
                'Você selecionou uma área fora do limite'
              );
            }

            navigation.navigate('Confirm', {
              crimeType,
              crimeZone,
              newCoordinates,
            });
          }}
        >
          <Circle
            center={coordinates}
            radius={1000}
            fillColor="rgba(32, 178, 171, 0.3)"
            strokeColor="#20b2ab"
          />
        </MapView>
      )}
    </View>
  );
}

SelectLocation.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o local no mapa',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#20B2aB" />
    </TouchableOpacity>
  ),
  headerTransparent: false,
  headerTintColor: '#20B2aB',
});

export default SelectLocation;
