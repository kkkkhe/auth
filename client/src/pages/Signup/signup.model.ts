import {createJsonQuery, declareParams} from "@farfetched/core";
import {zodContract} from "@farfetched/zod";
import {combine, createEvent, createStore, sample} from "effector";
import {z} from 'zod'
import {$isAuthorized, $sessionUser} from "@/entities/session";
import {tokenReceived} from "@/shared/api/access-token";
import {createPageRoute} from "@/shared/lib/create-page-route";
import {homeRouter, signupRouter} from "@/shared/router/routes";
import {chainAnonymous} from "@/entities/session/chain-anonymous";
import {lazy} from "react";
import {redirect} from "atomic-router";
import {spread} from "patronum";
const SignupPage = lazy(() => import('./signup.page'))
const contract = z.object({
    user: z.object({
        name: z.string(),
        email: z.string().email(),
        id: z.number(),
    }),
    access_token: z.string()
});
const chainAnonymousRoute = chainAnonymous({route: signupRouter.route})
export const SignupRoute = createPageRoute({view: SignupPage, route: chainAnonymousRoute})
export const nameChanged = createEvent<string>()
export const emailChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const submitTriggered = createEvent()

export const $name = createStore('')
    .on(nameChanged, (name, value) => value)
export const $email = createStore('')
    .on(emailChanged, (password, value) => value)
export const $password = createStore('')
    .on(passwordChanged, (password, value) => value)

interface FormFields {
    name: string
    email: string
    password: string
}


const $form = combine($name, $email, $password)
const signupContract = zodContract(contract)
const signup = createJsonQuery({
    params: declareParams<FormFields>(),
    request: {
        method: 'POST',
        body: ({name, email, password}  ) => ({name,email,password}),
        url: 'http://localhost:3000/auth/signup',
        credentials: 'include'
    },
    response: {
        contract: signupContract
    }
})

sample({
    clock: submitTriggered,
    source: $form,
    fn: ([name, email, password]) => ({name, email, password}),
    target: signup.start
})


// put data into the store
sample({
    clock: signup.finished.success,
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
// redirect on success signup
sample({
    clock: signup.finished.success,
    target: redirect({
        route: homeRouter.route
    })
})
