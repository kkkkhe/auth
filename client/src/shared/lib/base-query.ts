import {Contract, createJsonQuery, declareParams, Query} from "@farfetched/core";
import {createEffect} from "effector";
import {$sessionToken} from "@/entities/session";

export const baseQuery = <T>({
        method = 'GET',
        query,
        body,
        headers,
        contract,
        params
    }: {
        method?: 'GET' | 'POST',
        query?: string,
        body?: any,
        headers?: Record<string, string | string[]>,
        contract: Contract<unknown, any>,
        params?:  any
    }) => {
    return createJsonQuery({
        params: declareParams(),
        request: {
            method,
            url: () => {
                console.log(params)
                const urlParams = new URLSearchParams(params)
                console.log(urlParams.has('token'))
                return `http://localhost:3000/users/1`
            },
            body,
            headers: {
                source: $sessionToken,
                fn: (data, token) => ({
                    'Authorization': `Bearer ${token}`,
                    ...headers
                })
            }
        },
        response: {
            contract
        }
    })}
