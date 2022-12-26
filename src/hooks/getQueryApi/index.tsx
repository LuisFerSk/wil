import { AxiosResponse } from "axios";
import { Dispatch, useEffect, useState, SetStateAction } from "react";

type useGetQueryApiReturn<T> = [
    T,
    Dispatch<SetStateAction<T>>
]

export function useGetQueryApi<T>(get: Promise<AxiosResponse<any, any>>, initState: T): useGetQueryApiReturn<T> {
    const [state, setState] = useState<T>(initState)

    useEffect(() => {
        get.then((response) => {
            setState(response.data.info)
        })
    }, [])

    return [state, setState];
}