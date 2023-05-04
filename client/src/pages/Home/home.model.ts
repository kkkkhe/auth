import {z} from "zod";
import {zodContract} from "@farfetched/zod";
import {debug} from "patronum";
import {createEvent, sample} from "effector";
import {authQuery} from "@/shared/lib/auth-query";
import {createPageRoute} from "@/shared/lib/create-page-route";
import {homeRouter} from "@/shared/router/routes";
import {lazy} from "react";
const HomePage = lazy(() => import('./home.page'))
export const HomeRoute = createPageRoute({view: HomePage, route: homeRouter.route})
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
})
const userZodContract = zodContract(UserSchema)

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
debug(userQuery.$data)
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