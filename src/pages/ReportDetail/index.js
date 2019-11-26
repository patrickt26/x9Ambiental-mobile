import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { format, parseISO } from 'date-fns';

import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  Title,
  Form,
  SubmitButtonUpdate,
  SubmitButtonResolve,
  FormTextInput,
  PageTitle,
} from './styles';

export default function ReportDetail({ navigation }) {
  const {
    id,
    user_id,
    description,
    crime_type,
    crime_zone,
    address,
    createdAt,
  } = navigation.getParam('item');

  const [newDescription, setNewDescription] = useState(description);

  const profile = useSelector(state => state.user.profile);

  const auth = profile.id === user_id;

  const dateFormatted = format(parseISO(createdAt), 'dd/MM/yyyy - HH:mm');

  async function handleCancel() {
    await api.delete(`reports/${id}`);

    Alert.alert('Concluído', 'Relato marcado como resolvido');

    navigation.navigate('Map');
  }

  async function handleUpdate() {
    await api.put(`reports/${id}`, {
      description: newDescription,
    });

    Alert.alert('Sucesso', 'Descrição do relato foi atualizada');
  }

  return (
    <Background>
      <Container>
        <PageTitle>Detalhes</PageTitle>
        <Form>
          <Title>Descrição</Title>
          <FormTextInput
            multiline
            value={newDescription}
            onChangeText={setNewDescription}
            editable={auth}
          />

          <Title>Tipo de crime</Title>
          <FormTextInput value={crime_type} editable={false} />

          <Title>Área afetada</Title>
          <FormTextInput value={crime_zone} editable={false} />

          <Title>Data/Hora</Title>
          <FormTextInput multiline value={dateFormatted} editable={false} />

          <Title>Endereço</Title>
          <FormTextInput multiline value={address} editable={false} />

          {auth ? (
            <>
              <SubmitButtonUpdate onPress={handleUpdate}>
                Atualizar descrição
              </SubmitButtonUpdate>
              <SubmitButtonResolve onPress={handleCancel}>
                Marcar como resolvido
              </SubmitButtonResolve>
            </>
          ) : (
            <></>
          )}
        </Form>
      </Container>
    </Background>
  );
}

ReportDetail.navigationOptions = ({ navigation }) => ({
  title: '',
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
