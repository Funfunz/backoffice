import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, createRoutesFromElements, RouterProvider, Route, useRouteError, redirect } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import PrivateRoute from 'components/PrivateRoute'
import { Layout } from 'components/Layout'
import 'style/index.scss'
import { isAuthenticated } from 'services/auth'

function ErrorBoundary() {
  let error = useRouteError()
  console.error(error)
  return <div>Dang!</div>
}

const router = createHashRouter(
  createRoutesFromElements(
    <Route ErrorBoundary={ErrorBoundary}>
      <Route path="/login" lazy={() => import("./views/login")} />
      <Route element={<Layout />}>
        <Route path="/" lazy={() => import("./views/home")} loader={async () => {
          if (!isAuthenticated()) {
            return redirect("/login")
          }
          return null
        }}/>
        <Route path="/playground" lazy={() => import("./views/playground")} loader={async () => {
          if (!isAuthenticated()) {
            return redirect("/login")
          }
          return null
        }}/>
        <Route path="/list/:entityName" lazy={() => import("views/list")} loader={async () => {
          if (!isAuthenticated()) {
            return redirect("/login")
          }
          return null
        }}/>
        <Route path="/:view/:entityName/:id?" lazy={() => import("views/edit")} loader={async () => {
            if (!isAuthenticated()) {
              return redirect("/login")
            }
            return null
          }}/>
      <Route path="/logout" element={
        <PrivateRoute lazy={"views/logout"} />
      } />
      </Route>
    </Route>
    
  )
)

const App = () => (
  <RouterProvider router={router} />
)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
