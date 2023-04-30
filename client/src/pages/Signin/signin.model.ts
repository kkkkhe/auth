import {createJsonQuery, declareParams} from "@farfetched/core";
import {zodContract} from "@farfetched/zod";
import {combine, createEvent, createStore, sample} from "effector";
import {z} from 'zod'
import {$sessionToken, $sessionUser} from "@/entities/session";
const contract = z.object({
    user: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
    }),
    access_token: z.string()
});
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
const signupContract = zodContract(contract)
const signin = createJsonQuery({
    params: declareParams<FormFields>(),
    request: {
        method: 'POST',
        body: ({email, password}  ) => ({email,password}),
        url: 'http://localhost:3000/auth/signin',
        credentials: 'include'
    },
    response: {
        contract: signupContract
    }
})

// put data into the store
sample({
    clock: signin.finished.success,
    fn: ({result: {user}}) => ({
        name: user.name,
        email: user.email,
        id: user.id
    }),
    target: $sessionUser
})
sample({
    clock: signin.finished.success,
    fn: ({result}) => result.access_token,
    target: $sessionToken
})


sample({
    clock: submitTriggered,
    source: $form,
    fn: ([email, password]) => ({email, password}),
    target: signin.start
})
