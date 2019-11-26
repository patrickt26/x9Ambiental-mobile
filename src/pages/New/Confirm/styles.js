import styled from 'styled-components/native';

import Button from '~/components/Button';
import Input from '~/components/Input';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #fff;
  font-weight: bold;
  align-self: flex-start;
  margin-top: 5px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 30 },
})`
  align-self: stretch;
  margin-top: 15%;
`;

export const ActivityContainer = styled.View.attrs({
  contentContainerStyle: { padding: 30 },
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  text-align: center;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
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
