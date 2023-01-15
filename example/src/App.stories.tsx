import React from 'react';

import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import App from './App';

export default {
  title: 'App Knobs',
  decorators: [withKnobs],
};


storiesOf('App', module).add('Default', () => <App />);
