import {RouterProvider} from 'atomic-router-react'
import {router} from "@/app/router.config";
import {RouterView} from "@/pages";
import {appStarted} from "@/processes/refresh/refresh.model";
import {attachOperation, createJsonQuery, declareParams} from "@farfetched/core";
import { z } from 'zod'
import {zodContract} from "@farfetched/zod";
import {createEvent, sample} from "effector";
import {debug} from "patronum";
import {$sessionToken} from "@/entities/session";
import {baseQuery} from "@/shared/lib/base-query";
appStarted()
const UserSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
})
const userZodContract = zodContract(UserSchema)
// const getUser = createJsonQuery({
//     params: declareParams<{id: number, token: string | null}>(),
//     request: {
//         method: 'GET',
//         headers: ({token}) => ({'Authorization':`Bearer ${token}`}),
//         url:( {id}) => `http://localhost:3000/users/${id}`,
//     },
//     response: {
//         contract: userZodContract
//     }
// })
const userQuery = baseQuery({
    query: 'users',
    contract: userZodContract,
    params: {id: 1},
})
debug(userQuery.finished.failure)

const getUserTriggered = createEvent<{id: number}>()
sample({
    clock: getUserTriggered,
    source: $sessionToken,
    fn: (token, {id}) => {
        return {
            token,
            id
        }
    },
    target: userQuery.start
})
debug(userQuery.$data)
function App() {
  return (
      <RouterProvider router={router}>
            <button onClick={() => getUserTriggered({id: 1})}>Get user</button>
          <RouterView/>
      </RouterProvider>
  )
}

export default App
