import styled from 'styled-components/native';

export const Container = styled.View`
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  background: #fff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  opacity: ${props => (props.past ? 0.6 : 1)};
`;

export const Left = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Info = styled.View``;

export const Zone = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #777;
  font-style: italic;
`;

export const Type = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #333;
`;

export const Address = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #999;
  font-size: 12px;
  margin-top: 4px;
  margin-right: 15px;
  max-width: 86%;
`;
