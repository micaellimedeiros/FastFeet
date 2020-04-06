import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from '~/pages/SignIn';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
  }),
)
