import { withKnobs } from '@storybook/addon-knobs';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { initializeMsw, withMsw, withReactQuery } from './decorators';

import * as stories from './stories';

import './rn-addons';

const queryClient = new QueryClient();

// Available options @ https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
const StorybookUIRoot = getStorybookUI({
  port: 7007,
  asyncStorage: require('@react-native-async-storage/async-storage').default || null,
});

// No need for warnings in a sandbox environment
LogBox.ignoreAllLogs();

initializeMsw();

configure(() => stories, module);

// Enables knobs for all stories
addDecorator(withKnobs);
addDecorator(withMsw);
addDecorator((storyFn) => withReactQuery(storyFn, queryClient));

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StorybookUIRoot />
    </QueryClientProvider>
  )
};
