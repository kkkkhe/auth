import {createEvent, createStore, sample} from "effector";

interface SessionUser {
    id: number
    name: string
    email: string

}
export const resetSessionTriggered = createEvent()
// move probably to entity/user
export const $sessionUser = createStore<SessionUser>({} as SessionUser)
export const $authDone = createStore(false)
export const $isAuthorized = createStore(false)

sample({
    clock: resetSessionTriggered,
    fn: () => true,
    target: [$sessionUser.reinit!, $isAuthorized.reinit!]
})