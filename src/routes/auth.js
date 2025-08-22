import { lazy } from "react"
import { s } from "components/lib"

const Signin = lazy(() => import("views/auth/signin"))
const Signup = lazy(() => import("views/auth/signup"))

const Routes = [
  {
    path: "/signin",
    view: s(Signin),
    layout: "auth",
    title: "Авторизация",
  },
  {
    path: "/signup",
    view: s(Signup),
    layout: "auth",
    title: "Регистрация",
  },
]

export default Routes
