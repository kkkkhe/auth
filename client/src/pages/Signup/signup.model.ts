import {createJsonQuery, declareParams} from "@farfetched/core";
import {zodContract} from "@farfetched/zod";
import {combine, createEvent, createStore, sample} from "effector";
import {z} from 'zod'
import {$sessionToken, $sessionUser} from "@/entities/session";
const contract = z.object({
    user: z.object({
        name: z.string(),
        email: z.string().email(),
        id: z.number(),
    }),
    access_token: z.string()
});
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
// put data into the store
sample({
    clock: signup.finished.success,
    fn: ({result: {user}}) => ({
        name: user.name,
        email: user.email,
        id: user.id
    }),
    target: $sessionUser
})
sample({
    clock: signup.finished.success,
    fn: ({result}) => result.access_token,
    target: $sessionToken
})


sample({
    clock: submitTriggered,
    source: $form,
    fn: ([name, email, password]) => ({name, email, password}),
    target: signup.start
})