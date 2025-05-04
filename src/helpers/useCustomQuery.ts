import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { getCoffeeList, setData } from '../model/coffeeStore';
import { GetCoffeeListReqParams } from '../types/coffeeTypes';

export const useCustomQuery = (params?: GetCoffeeListReqParams) => {
    const { data, status } = useQuery({
        queryKey: ['coffeeList', params],
        queryFn: () => {
            return getCoffeeList(params);
        }
    })
    useEffect(() => {
        setData(data);
    }, [data, status])
  
}