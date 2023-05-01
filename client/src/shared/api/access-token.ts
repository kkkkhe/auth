import {createEvent, createStore, sample} from "effector";
import {debug} from "patronum";

export const tokenSet = createEvent<string>()
export const $token = createStore<string | null>(null)
debug($token)
sample({
    clock: tokenSet,
    target: $token
})
