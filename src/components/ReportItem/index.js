import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Info, Zone, Type, Address } from './styles';

export default function ReportItem({ data, onCancel, navigation }) {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Left>
        <Info>
          <Type>{`${data.crime_type}`}</Type>
          <Zone>{`${data.crime_zone}`}</Zone>
          <Address>{data.address}</Address>
        </Info>
      </Left>

      {profile.id === data.user_id && !data.resolved_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="offline-pin" size={20} color="#90ee90" />
        </TouchableOpacity>
      )}
    </Container>
  );
}
