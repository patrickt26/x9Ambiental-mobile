import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const PageTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
  align-self: flex-start;
  margin-top: 5px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
`;

export const SubmitButtonUpdate = styled(Button)`
  margin-top: 10px;
`;

export const SubmitButtonResolve = styled(Button)`
  margin-top: 15px;
  background: #20b2aa;
`;

export const FormTextInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255, 255, 255, 0.8)',
})`
  align-self: stretch;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  color: #fff;
  font-size: 15px;
`;
