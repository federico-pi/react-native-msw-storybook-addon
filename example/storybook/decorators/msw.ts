import { StoryFn, DecoratorFunction } from '@storybook/addons';
import { values, isEmpty, isArray } from 'lodash';
import { RequestHandler, MockedRequest, DefaultBodyType } from 'msw';
import { setupServer } from 'msw/native';

interface RequestHandlerDefaultInfo {
  header: string;
}

type HandlersChunk = RequestHandler<
  RequestHandlerDefaultInfo,
  MockedRequest<DefaultBodyType>,
  unknown,
  MockedRequest<DefaultBodyType>
>[];

export type DecoratorType = DecoratorFunction<unknown>

export type MswHandlers = { handlers: RequestHandler[] | Record<string, RequestHandler> };

export type MswParameters = { parameters: { msw: MswHandlers } };

const server = setupServer();

const setMswHandlers = (msw: MswHandlers | undefined) => {
  if (!msw) {
    return console.info('No instance of msw found, aborting');
  }

  if (isArray(msw) && !isEmpty(msw)) {
    // Support an Array of request handlers (backwards compatibility).
    return server.use(...msw);
  }

  if ('handlers' in msw && msw.handlers) {
    // Support an Array named request handlers
    // or an Object of named request handlers with named arrays of handlers
    const handlers = values(msw.handlers)
      .filter(Boolean)
      .reduce(
        (handlersChunk: HandlersChunk, handlersList) => handlersChunk.concat(handlersList),
        [],
      );

    if (!isEmpty(handlers)) {
      return server.use(...handlers);
    }
  }

  return console.info('No handlers found, ensure msw handlers are passed correctly');
};

/** @description Allow set of msw handlers */
export const withMsw = (storyFn: StoryFn<unknown>, { parameters: { msw } }: MswParameters) => {
  server.resetHandlers(); // cleaning handlers

  setMswHandlers(msw); // setting handlers

  return () => storyFn();
};

/** @description Initialize msw server */
export const initializeMsw = () => {
  // Do not warn or error out if a non-mocked request happens.
  // If we don't use this, Storybook will be spammy about requests
  // made to fetch the JS bundle etc.
  server.listen({ onUnhandledRequest: 'bypass' });
};
