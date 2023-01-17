import { withKnobs } from '@storybook/addon-knobs';
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native';
import { LogBox } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { DecoratorType, initializeMsw, withMsw, withReactQuery } from './decorators';

import * as stories from './stories';

import './modules/rn-addons';

const queryClient = new QueryClient();

// Available options @ https://github.com/storybookjs/react-native/tree/master/app/react-native#getstorybookui-options
// There may be an instance where resolving to localhost cannot connect to the storybook app,
// to fix you can force the host by adding the property `host: [IP_ADDRESS]`, or
// pass in the flag `-h [IP_ADDRESS]` when running the storybook server
const StorybookUI = getStorybookUI({
  port: 7007,
  asyncStorage: require('@react-native-async-storage/async-storage').default || null,
});

LogBox.ignoreAllLogs(); // No need for warnings in a sandbox environment

initializeMsw();

addDecorator(withKnobs); // Enables knobs for all stories
addDecorator(withMsw as unknown as DecoratorType);
addDecorator((storyFn) => withReactQuery(storyFn, queryClient));

configure(() => stories, module);

export default () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StorybookUI />
    </QueryClientProvider>
  )
};
