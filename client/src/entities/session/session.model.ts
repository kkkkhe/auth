import {createStore} from "effector";

interface SessionUser {
    id: number
    name: string
    email: string

}

export const $sessionUser = createStore<SessionUser>({} as SessionUser)

export const $sessionToken = createStore<string | null>(null)
