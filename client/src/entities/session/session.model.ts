import {createStore} from "effector";

interface SessionUser {
    id: number
    name: string
    email: string

}

// move probably to entity/user
export const $sessionUser = createStore<SessionUser>({} as SessionUser)

export const $authDone = createStore(false)
export const $isAuthorized = createStore(false)
    .on($sessionUser, () => true)
