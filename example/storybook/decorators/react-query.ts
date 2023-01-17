import { StoryFn } from "@storybook/addons";
import { QueryClient } from "react-query";

export const withReactQuery = (storyFn: StoryFn<unknown>, queryClient: QueryClient) => {
  queryClient.clear(); // Clearing the React Query cache is suggested for use of msw

  return storyFn();
}
