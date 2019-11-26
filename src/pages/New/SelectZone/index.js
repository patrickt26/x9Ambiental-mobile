import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Name } from './styles';

export default function SelectZone({ navigation }) {
  const [crimeZones, setCrimeZones] = useState([]);

  const crimeType = navigation.getParam('crimeType');

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('crimeZones');

      setCrimeZones(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={crimeZones}
          keyExtractor={crimeZone => String(crimeZone.id)}
          renderItem={({ item: crimeZone }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectLocation', { crimeType, crimeZone })
              }
            >
              <Name>{crimeZone.zone}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectZone.navigationOptions = ({ navigation }) => ({
  title: 'Selecione a área afetada',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={30} color="#FFF" />
    </TouchableOpacity>
  ),
});
