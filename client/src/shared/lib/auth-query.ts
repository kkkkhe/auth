import {Contract, createHeadlessQuery, DynamicallySourcedField} from "@farfetched/core";
import {baseQuery} from "@/shared/lib/base-query";
import {createEffect} from "effector/effector.umd";
import {$token, tokenReceived} from "@/shared/api/access-token";
import {attach} from "effector";

interface Request {
    method?: 'GET' | 'POST',
    query?: string,
    headers?: Record<string, string | string[]>,
}
interface Response {
    contract: Contract<unknown, any>,
    mapData: DynamicallySourcedField<any, any, any>
}

interface Refresh {
   user: {
       id: number
       name: string
       email: string
   },
    access_token: string
}
export const authQuery = ({request, response}:{request: Request, response: Response}) => {

    const fx = attach({
        source: $token,
        mapParams: ({body}, token) => {
            return {
                token,
                body
            }
        },
        effect: createEffect(async ({token, body}:{
            token: string | null,
            body: any
        }) => {
            try {
                const res = await baseQuery({
                    query:request.query,
                    headers: request.headers,
                    method: request.method,
                    token,
                    body
                })
                return res
            }
            catch (e){
                const refresh = await fetch('http://localhost:3000/refresh', {method: 'GET', credentials: 'include'})
                const {access_token} = await refresh.json() as Refresh
                if(access_token){
                    tokenReceived(access_token)
                    const res = await baseQuery({
                        query:request.query,
                        headers: request.headers,
                        method: request.method,
                        token: access_token,
                        body
                    })
                    return res
                }
            }
        })
    })
    const headlessQuery = createHeadlessQuery({
        contract: response.contract,
        mapData: response.mapData,
    })
    headlessQuery.__.executeFx.use(fx);
    return headlessQuery;
}