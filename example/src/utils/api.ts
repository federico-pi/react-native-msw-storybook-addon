import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import axios from 'axios';
import { REACT_QUERY_KEYS } from './types';

export async function getFoo() {
  const URL = 'url/foo';

  // return it how Daniel returned it
  return axios.get<any>(URL);
}

export function useFoo(
  options?: Omit<
    UseQueryOptions<unknown, any, any, [REACT_QUERY_KEYS.FOO]>,
    'queryKey' | 'queryFn'
  >,
): UseQueryResult<any> {
  return useQuery([REACT_QUERY_KEYS.FOO], () => getFoo(), { ...options });
}
