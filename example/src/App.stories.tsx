import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';

import App from './App';
import { rest } from 'msw';

export default {
  title: 'App Knobs',
  decorators: [withKnobs],
};

const AppMock = () => <App />;

storiesOf('App', module)
  .add('Mock success', AppMock, {
    msw: {
      handlers: () => {
        const mockResponse = 'foo';

        return [
        rest.get('url/foo', (_, res, ctx) => {
          return res(
            ctx.json({
              foo: mockResponse,
            }),
          )
        }),
      ]},
    },
  })
  .add('Mock error', AppMock, {
    msw: {
      handlers: [
        rest.get('url/foo', (_, res, ctx) => {
          return res(ctx.delay(2250), ctx.status(502))
        }),
      ],
    },
  });
