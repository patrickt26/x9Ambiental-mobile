import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';

import { Container, ProvidersList, Provider, Name } from './styles';

export default function SelectType({ navigation }) {
  const [crimeTypes, setCrimeTypes] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('crimeTypes');

      setCrimeTypes(response.data);
    }

    loadProviders();
  }, []);

  return (
    <Background>
      <Container>
        <ProvidersList
          data={crimeTypes}
          keyExtractor={crimeType => String(crimeType.id)}
          renderItem={({ item: crimeType }) => (
            <Provider
              onPress={() => navigation.navigate('SelectZone', { crimeType })}
            >
              <Name>{crimeType.type}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectType.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o tipo de crime',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Map');
      }}
    >
      <Icon name="chevron-left" size={30} color="#FFF" />
    </TouchableOpacity>
  ),
});
