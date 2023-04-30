import {Contract} from "@farfetched/core";

interface Request {
    url: string,
    method?: 'GET' | 'POST',
    headers?: Record<string, string | string[]>,
    body?: any,
}
interface Response {
    contract: Contract<unknown, any>,
}
export const authQuery = (request: Request, response: Response) => {

}