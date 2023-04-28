import {createStore} from "effector";
import {debug} from "patronum";

interface SessionUser {
    id: number
    name: string
    email: string

}

export const $sessionUser = createStore<SessionUser>({} as SessionUser)

debug($sessionUser)

export const $sessionToken = createStore<string | null>(null)
debug($sessionToken)
