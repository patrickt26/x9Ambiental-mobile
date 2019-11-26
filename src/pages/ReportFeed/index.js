import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withNavigationFocus } from 'react-navigation';

import api from '~/services/api';

import Background from '~/components/Background';
import ReportItem from '~/components/ReportItem';

import { Container, Title, List } from './styles';

function ReportFeed({ isFocused, navigation }) {
  const [reports, setReports] = useState([]);

  async function loadReports() {
    const response = await api.get('reports');

    setReports(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadReports();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    const response = await api.delete(`reports/${id}`);

    setReports(
      reports.map(report =>
        report.id === id
          ? {
              ...report,
              resolved_at: response.data.resolved_at,
            }
          : report
      )
    );

    loadReports();
  }

  return (
    <Background>
      <Container>
        <Title>Relatos</Title>

        <List
          data={reports}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ReportDetail', { item });
              }}
            >
              <ReportItem
                onCancel={() => handleCancel(item.id)}
                data={item}
                navigation={navigation}
              />
            </TouchableOpacity>
          )}
        />
      </Container>
    </Background>
  );
}

ReportFeed.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="explore" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(ReportFeed);
