import { AxiosResponse } from "axios";
import { Dispatch, useEffect, useState, SetStateAction } from "react";

type useGetQueryApiReturn<T> = [
    T | undefined,
    Dispatch<SetStateAction<T | undefined>>
]

export default function useGetQueryApi<T>(get: Promise<AxiosResponse<T, any>>): useGetQueryApiReturn<T> {
    const [state, setState] = useState<T | undefined>()

    useEffect(() => {
        get.then((response) => {
            setState(response.data)
        })
    }, [])

    return [state, setState];
}