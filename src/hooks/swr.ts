import useSWR from 'swr';
import api from '../services/api';

export function useSwr<Data = any, Error = any>(url: string) {
  const { data, error } = useSWR<Data, Error>(url, async (path) => {
    const response = await api(path);

    return response.data;
  });

  return { data, error };
}
