import {z} from "zod";
import {zodContract} from "@farfetched/zod";
import {createJsonQuery} from "@farfetched/core";
import {createEvent, createStore, sample} from "effector";
import {$authDone, $isAuthorized, $sessionUser} from "@/entities/session";
import {tokenReceived} from "@/shared/api/access-token";
import {debug, spread} from "patronum";
export const appStarted = createEvent()

const contract = z.object({
    user: z.object({
        name: z.string(),
        email: z.string().email(),
        id: z.number(),
    }),
    access_token: z.string()
});
const refreshZodContract = zodContract(contract)
const refresh = createJsonQuery({
    request: {
        method: 'GET',
        url: 'http://localhost:3000/refresh',
        credentials: 'include'
    },
    response: {
        contract: refreshZodContract,
    }
})

sample({
    clock: appStarted,
    target: refresh.start
})

sample({
    clock: refresh.finished.success,
    fn: ({result}) => result.user,
    target: $sessionUser
})

sample({
    clock: refresh.finished.success,
    fn: ({result}) => result.access_token,
    target: tokenReceived
})
const $store = createStore('')
debug($store)
sample({
    clock: refresh.finished.success,
    fn: ({result}) => ({
        token: result.access_token,
        user: result.user,
        authorized: true
    }),
    target: spread({
        targets: {
            token: tokenReceived,
            user: $sessionUser,
            authorized: $isAuthorized
        }
    })
})

sample({
    clock: refresh.finished.finally,
    fn: () => true,
    target: $authDone
})