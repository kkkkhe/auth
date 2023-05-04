import {createEvent, createStore, sample} from "effector";

export const tokenReceived = createEvent<string>()
export const $token = createStore<string | null>(null)
sample({
    clock: tokenReceived,
    target: $token
})
