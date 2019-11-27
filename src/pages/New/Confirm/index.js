import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geocoder from 'react-native-geocoding';

import { GOOGLE_API_KEY } from 'react-native-dotenv';
import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Title,
  Separator,
  Form,
  FormInput,
  SubmitButton,
  FormTextInput,
  ActivityContainer,
} from './styles';

export default function Confirm({ navigation }) {
  const crimeType = navigation.getParam('crimeType');
  const crimeZone = navigation.getParam('crimeZone');
  const newCoordinates = navigation.getParam('newCoordinates');

  const profile = useSelector(state => state.user.profile);

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState('');

  useEffect(() => {
    Geocoder.init(GOOGLE_API_KEY, {
      language: 'pt-br',
    });
    Geocoder.from(newCoordinates)
      .then(res => {
        setAddress(res.results[0].formatted_address);
        setLoading(false);
      })
      .catch(err => {});
  }, [newCoordinates]);

  async function handleAddReport() {
    await api.post('reports', {
      latitude: newCoordinates.latitude,
      longitude: newCoordinates.longitude,
      address,
      crime_type: crimeType.type,
      crime_zone: crimeZone.zone,
      user_id: profile.id,
    });

    Alert.alert('Concluído', 'Seu relato foi enviado com sucesso');

    navigation.navigate('Map');
  }

  return (
    <Background>
      <Container>
        {loading ? (
          <ActivityContainer>
            <ActivityIndicator size="large" />
          </ActivityContainer>
        ) : (
          <Form>
            <Title>Descrição</Title>
            <FormTextInput
              multiline
              value={description}
              onChangeText={setDescription}
              placeholder="Opcional"
            />

            <Separator />

            <Title>Tipo de crime</Title>
            <FormInput
              icon="check-box"
              placeholder="Tipo de crime"
              // ref={emailRef}
              returnKeyType="next"
              // onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={crimeType.type}
              editable={false}
            />
            <Title>Área afetada</Title>
            <FormInput
              icon="check-box"
              placeholder="Área afetada"
              // ref={emailRef}
              returnKeyType="next"
              // onSubmitEditing={() => oldPasswordRef.current.focus()}
              value={crimeZone.zone}
              editable={false}
            />
            <Title>Endereço</Title>
            <FormTextInput
              multiline
              placeholder="Endereço"
              value={address}
              editable={false}
            />

            <SubmitButton onPress={handleAddReport}>Enviar relato</SubmitButton>
          </Form>
        )}
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar relato',
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
