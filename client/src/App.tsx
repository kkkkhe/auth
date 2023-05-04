import {RouterProvider} from 'atomic-router-react'
import {RouterView} from "@/pages";
import {appStarted} from "@/processes/refresh/refresh.model";
import {Suspense} from "react";
import {router} from "@/app/router.config";
appStarted()


function App() {
  return (
      <Suspense fallback={false}>
          <RouterProvider router={router}>
              <RouterView/>
          </RouterProvider>
      </Suspense>
  )
}

export default App
