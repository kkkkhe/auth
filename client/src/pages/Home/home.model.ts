import {z} from "zod";
import {zodContract} from "@farfetched/zod";
import {createEffect, createEvent, sample} from "effector";
import {authQuery} from "@/shared/lib/auth-query";
import {createPageRoute} from "@/shared/lib/create-page-route";
import {homeRouter} from "@/shared/router/routes";
import {lazy} from "react";
import {createQuery} from "@farfetched/core";
import {resetSessionTriggered} from "@/entities/session";
import {redirect} from "atomic-router";
const HomePage = lazy(() => import('./home.page'))
export const HomeRoute = createPageRoute({view: HomePage, route: homeRouter.route})
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
})
const userZodContract = zodContract(UserSchema)

export const getUserTriggered = createEvent<{id: number}>()
export const logoutTriggered = createEvent()

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

const logoutQuery = createQuery({
    handler: createEffect(async () => {
        const res = await fetch('http://localhost:3000/auth/logout', {method: 'POST', credentials: 'include'})
        return res.json()
    })
})

sample({
    clock: logoutTriggered,
    target: logoutQuery.start
})
sample({
    clock: logoutQuery.finished.success,
    target: resetSessionTriggered
})
sample({
    clock: logoutQuery.finished.success,
    target: redirect({
        route: homeRouter.route
    })
})

