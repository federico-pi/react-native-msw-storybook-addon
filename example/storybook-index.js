import 'react-native-url-polyfill/auto';

import { registerRootComponent } from 'expo';

import Storybook from './storybook';

// registerRootComponent ensures the app environment is set up correctly
registerRootComponent(Storybook);
