import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import  store  from "./app/store"
import "./index.css"
import { NextUIProvider } from "@nextui-org/react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { sharedConfigRoutes } from "./shared/config";
import { startPageUi } from "./pages/StartPage"
import { FolderPageUi } from "./pages/Folder"
import { BinaryPage } from "./pages/BinaryPage/ui/BinaryPage"
import { LoginPageUi } from "./pages/LoginPage"
import { RegistartionPageUi } from "./pages/RegistrationPage"
const container = document.getElementById("root")
const { RouteName } = sharedConfigRoutes;
const { StartPage } = startPageUi;
const {FolderPage} = FolderPageUi;
const {LoginPage} = LoginPageUi
const {RegistrationPage} = RegistartionPageUi

// import { StartPage } from "./pages/StartPage/ui"

const { STORAGE, START_PAGE, AUTH, REGISTRATION, FOLDER, TREES, BINARY } = RouteName;

const router = createBrowserRouter([
  {
    path: START_PAGE,
    element: <StartPage/>,
},
{
    path: AUTH,
    element: <LoginPage/>
},
{
    path: REGISTRATION,
    element: <RegistrationPage/>
},
{
    path: FOLDER,
    element: <FolderPage/>
},
{
    path: TREES,
    element: <h1> layout</h1>
},
{
    path: BINARY,
    element: <BinaryPage/>
}
])

if (container) {
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider>
        <RouterProvider router={router} />
           
        </NextUIProvider>
        
      </Provider>
    </React.StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
