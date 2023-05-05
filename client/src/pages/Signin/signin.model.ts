import {createJsonQuery, declareParams} from "@farfetched/core";
import {zodContract} from "@farfetched/zod";
import {combine, createEvent, createStore, sample} from "effector";
import {z} from 'zod'
import {$isAuthorized, $sessionUser} from "@/entities/session";
import {tokenReceived} from "@/shared/api/access-token";
import {spread} from "patronum";
import {chainAnonymous} from "@/entities/session/chain-anonymous";
import {homeRouter, signinRouter} from "@/shared/router/routes";
import {lazy} from "react";
import {createPageRoute} from "@/shared/lib/create-page-route";
import {redirect} from "atomic-router";
const SigninPage = lazy(() => import('./signin.page'))
const contract = z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    }),
    access_token: z.string()
});

const chainAnonymousRoute = chainAnonymous({route: signinRouter.route})
export const SigninRoute = createPageRoute({view: SigninPage, route: chainAnonymousRoute})


export const emailChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const submitTriggered = createEvent()
export const $email = createStore('denzel2.denis@gmail.com')
    .on(emailChanged, (password, value) => value)
export const $password = createStore('2j8w6d12')
    .on(passwordChanged, (password, value) => value)

interface FormFields {
    email: string
    password: string
}


export const $form = combine($email, $password)
const signinContract = zodContract(contract)
const signin = createJsonQuery({
    params: declareParams<FormFields>(),
    request: {
        method: 'POST',
        body: ({email, password}  ) => ({email,password}),
        url: 'http://localhost:3000/auth/signin',
        credentials: 'include'
    },
    response: {
        contract: signinContract
    }
})

sample({
    clock: submitTriggered,
    source: $form,
    fn: ([email, password]) => ({email, password}),
    target: signin.start
})


// put data into the store
sample({
    clock: signin.finished.success,
    fn: ({result}) => ({
        user: result.user,
        token: result.access_token,
        authorized: true
    }),
    target: spread({
        targets: {
            user: $sessionUser,
            token: tokenReceived,
            authorized: $isAuthorized
        }
    })
})
// redirect on success
sample({
    clock: signin.finished.success,
    target: redirect({
        route: homeRouter.route
    })
})
