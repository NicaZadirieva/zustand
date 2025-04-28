import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useUrlStorage = <T extends Record<string, string>>(
    params: T,
    setParams: (params: T) => void
) => {
    const [ queryParams, setQueryParams ] = useSearchParams();

    const setParamsFromUrl = () => {
        const paramsFromUrl = Object.keys(params).reduce((acc, key) => {
            const value = queryParams.get(key);
            if (value) {
                acc[key as keyof T] = value as T[keyof T];
            } 
            return acc;
        }, {} as Partial<T>);
        if (paramsFromUrl) {
            setParams(paramsFromUrl as T);
        }
    }

    useEffect(setParamsFromUrl, [queryParams]);
    useEffect(() => {
        const newQueryParams = new URLSearchParams();
        if (params.text) {
            newQueryParams.set('text', params.text);
            setQueryParams(newQueryParams);
        }

    }, [params]);
}; 