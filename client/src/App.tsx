import {RouterProvider} from 'atomic-router-react'
import {router} from "@/app/router.config";
import {RouterView} from "@/pages";

function App() {

  return (
      <RouterProvider router={router}>
          <RouterView/>
      </RouterProvider>
  )
}

export default App
