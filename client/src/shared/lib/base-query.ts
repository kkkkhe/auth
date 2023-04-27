import {Contract, createJsonQuery} from "@farfetched/core";
import {createEffect} from "effector";

export const baseQueryFx = createEffect(async (
    {
        method = 'GET',
        query,
        body,
        headers,
        contract
    }: {
        method?: 'GET' | 'POST',
        query?: string,
        body?: any,
        headers: Record<string, string | string[]>,
        contract: Contract<unknown, any>
    }) => {
    const result = createJsonQuery({
        request: {
            method,
            url: `http://localhost:3000/${query}`,
            body,
            headers
        },
        response: {
            contract
        }
    })
})