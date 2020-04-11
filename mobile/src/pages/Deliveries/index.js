import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialIcons as Icon } from '@expo/vector-icons';

import { signOut } from '~/store/modules/auth/actions';

// import Background from '~/components/Background';
// import DeliveryCard from '~/components/DeliveryCard';

import {
  Container,
  Header,
  Avatar,
  WelcomeContainer,
  Welcome,
  Name,
  LogoutContainer,
} from './styles';

import ListDeliveries from '~/components/ListDeliveries';

function Deliveries({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(store => store.deliveryman.profile);
  const name =
    profile.name.split(' ').length > 2
      ? profile.name
          .split(' ')
          .splice(0, 2)
          // eslint-disable-next-line no-return-assign
          .reduce((total, current) => (total += ` ${current}`))
      : profile.name;
  function logout() {
    dispatch(signOut());
  }

  return (
    <>
      <Container>
        <Header>
          <Avatar name={name} size={68} avatar={profile.avatar} />
          <WelcomeContainer>
            <Welcome>Bem vindo,</Welcome>
            <Name>{name}</Name>
          </WelcomeContainer>
          <LogoutContainer>
            <TouchableOpacity onPress={logout}>
              <Icon name="exit-to-app" size={25} color="#E74040" />
            </TouchableOpacity>
          </LogoutContainer>
        </Header>

        <ListDeliveries navigation={navigation} />
      </Container>
    </>
  );
}

Deliveries.navigationOptions = {
  headerShown: false,
};

Deliveries.propTypes = {
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default Deliveries;
