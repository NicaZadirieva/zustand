import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../api/CoreApi';
import { appDispatch } from '../model/coffeeStore';
import { setData } from '../model/listSlice';
import { GetCoffeeListReqParams } from '../types/coffeeTypes';
const getCoffeeListRequest = async (params?: GetCoffeeListReqParams, /*controller?: AbortController*/) => {
      const { data } = await axios.get(BASE_URL, {
        params,
      });

      return data;
  }
  
export const useCustomQuery = (params?: GetCoffeeListReqParams) => {
    const dispatch = useDispatch<appDispatch>();
    const { data, status } = useQuery({
        queryKey: ['coffeeList', params],
        queryFn: async () => {
            return await getCoffeeListRequest(params);
        }
    })
    useEffect(() => {
        dispatch(setData(data));
    }, [data, status])
  
}