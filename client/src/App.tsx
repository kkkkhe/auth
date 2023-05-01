import {RouterProvider} from 'atomic-router-react'
import {router} from "@/app/router.config";
import {RouterView} from "@/pages";
import {appStarted} from "@/processes/refresh/refresh.model";
import {baseQuery} from "@/shared/lib/base-query";
import {authQuery} from "@/shared/lib/auth-query";
import {z} from 'zod'
import {zodContract} from "@farfetched/zod";
import {createEffect, createEvent, sample} from "effector";
import {$sessionToken} from "@/entities/session";
import {$token} from "@/shared/api/access-token";
appStarted()
const todoSchema = z.array(
    z.object({
        userId: z.number(),
        id: z.number(),
        title: z.string(),
        completed: z.boolean()
}))
const todoContract = zodContract(todoSchema)

const todosQuery = authQuery({
    request: {
        query: 'users/1',
    },
    response: {
        contract: todoContract,
        mapData: (data) => {
            console.log(data)
            return data
        }
    }
})

const startFetchTodos = createEvent()
sample({
    clock: startFetchTodos,
    source: $token,
    fn: (token) => ({
        token,
    }),
    target: todosQuery.start
})


function App() {
  return (
      <RouterProvider router={router}>
          <RouterView/>
      </RouterProvider>
  )
}

export default App
