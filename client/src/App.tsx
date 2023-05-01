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
function App() {
  return (
      <RouterProvider router={router}>
          <RouterView/>
      </RouterProvider>
  )
}

export default App
