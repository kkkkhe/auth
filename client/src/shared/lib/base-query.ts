import {Contract, createJsonQuery, declareParams, Query} from "@farfetched/core";
import {createEffect} from "effector";
import {$sessionToken} from "@/entities/session";
interface Request {
    url: string,
    method?: 'GET' | 'POST',
    headers?: Record<string, string | string[]>,
    body?: any,
}
interface Response {
    contract: Contract<unknown, any>,
}

export const baseQuery = async ({
        method,
        query,
        body,
        headers,
        params,
        token
    }: {
        method?: 'GET' | 'POST',
        query?: string,
        body?: any,
        headers?: Record<string, string | string[]>,
        params?:  any,
        token: string | null
    }) => {
        const res = await fetch(`http://localhost:3000/${query}`, {
            method,
            body,
            credentials: 'include',
            headers: prepareHeaders(headers, token)
        })
        if(res.ok){
            const data = await res.json()
            return data
        }
        throw new Error()
    }

    function prepareHeaders(header?: Record<string, string | string[]>, token?: string | null){
        if(!header){
            return {'Authorization': `Bearer ${token}`}
        }
        return {'Authorization': `Bearer ${token}`, ...header}
    }