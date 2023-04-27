import {createJsonQuery, declareParams} from "@farfetched/core";
import {zodContract} from "@farfetched/zod";
import {combine, createEvent, createStore, sample} from "effector";
import {z} from 'zod'
import {debug} from "patronum";
const contract = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
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
        url: 'http://localhost:3000/auth/signup'
    },
    response: {
        contract: signupContract
    }
})

debug(signup.$data)
sample({
    clock: signup.finished.success,
    fn: (data) => console.log(data)
})

sample({
    clock: submitTriggered,
    source: $form,
    fn: ([name, email, password]) => ({name, email, password}),
    target: signup.start
})
