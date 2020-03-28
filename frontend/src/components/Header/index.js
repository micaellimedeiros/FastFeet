import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <nav>
        <Link to="/">
          <img src={logo} alt="Fastfeet" />
        </Link>
        <div>
          <NavLink to="/deliveries" activeClassName="selected">
            ENCOMENDAS
          </NavLink>
          <NavLink to="/deliverymans" activeClassName="selected">
            ENTREGADORES
          </NavLink>
          <NavLink to="/recipients" activeClassName="selected">
            DESTINATÁRIOS
          </NavLink>
          <NavLink to="/problems" activeClassName="selected">
            PROBLEMAS
          </NavLink>
        </div>
      </nav>

      <Profile>
        <strong>{profile.name}</strong>
        <button onClick={handleSignOut} type="submit">
          Sair
        </button>
      </Profile>
    </Container>
  );
}
