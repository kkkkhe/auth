import {z} from "zod";
import {zodContract} from "@farfetched/zod";
import {baseQuery} from "@/shared/lib/base-query";
import {debug} from "patronum";
import {createEvent, sample} from "effector";
import {$sessionToken} from "@/entities/session";
import {authQuery} from "@/shared/lib/auth-query";

const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
})
const userZodContract = zodContract(UserSchema)
// const getUser = createJsonQuery({
//     params: declareParams<{id: number, token: string | null}>(),
//     request: {
//         method: 'GET',
//         headers: ({token}) => ({'Authorization':`Bearer ${token}`}),
//         url:( {id}) => `http://localhost:3000/users/${id}`,
//     },
//     response: {
//         contract: userZodContract
//     }
// })

export const getUserTriggered = createEvent<{id: number}>()

const userQuery = authQuery({
    request: {
        query: 'users/1',
        method: 'GET'
    },
    response: {
        contract: userZodContract,
        mapData: (data) => data
    }
})

sample({
    clock: getUserTriggered,
    target: userQuery.start
})


// sample({
//     clock: getUserTriggered,
//     source: $sessionToken,
//     fn: (token, {id}) => {
//         return {
//             token,
//             id
//         }
//     },
//     target: userQuery.start
// })
// debug(userQuery.$data)