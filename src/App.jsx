import "./App.css"
import Main from "./pages/main/main"
import Video from "./pages/video/video"
import { videoLoader } from "../src/utils/function"
// import { useLocation } from "react-router-dom"
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
  useParams,

} from "react-router-dom"
import Quiz from "./pages/quiz/quiz"
// import { useSearchParams } from "react-router-dom"

const App = () => {

  const router = createBrowserRouter([
    { path: "/", element: <Main /> },
    {
      path: "/video",
      element: <Video />,
      loader: videoLoader,
    },
    {
      path: "/quiz",
      element: <Quiz />,
    },
  ])


  return <RouterProvider router={router} />
}

export default App

// Router setup

