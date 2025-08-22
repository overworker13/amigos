import axios from "axios"
import { createContext, useEffect, useState } from "react"
import Settings from "../data/settings.json"
import { Navigate } from "react-router-dom"

// auth context
export const AuthContext = createContext()

export function AuthProvider(props) {
  // axios base URL
  axios.defaults.baseURL = Settings[process.env.NODE_ENV].server_url

  const cache = JSON.parse(localStorage.getItem("user"))
  const [user, setUser] = useState(cache)

  useEffect(() => {
    // update the auth status
    if (localStorage.getItem("user")) {
      let user = JSON.parse(localStorage.getItem("user"))
      localStorage.setItem("user", JSON.stringify(user))
      setUser(user)
    }
  }, [])

  const signin = async ({ user, access_token, warehouse }) => {
    if (user && access_token) {
      const warehouse_id = warehouse.id
      const warehouse_name = warehouse.name
      const warehouse_code = warehouse.code

      delete warehouse.code
      delete warehouse.name
      delete warehouse.id

      warehouse.warehouse_code = warehouse_code
      warehouse.warehouse_id = warehouse_id
      warehouse.warehouse_name = warehouse_name
      const token = access_token

      const userData = { ...user, token, ...warehouse }

      localStorage.setItem("user", JSON.stringify(userData))

      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
      setUser(userData)
      return (window.location = "/")
    }
  }

  const signout = () => {
    localStorage.clear("user")
    delete axios.defaults.headers.common["Authorization"]
    setUser(null)
    return (window.location = "/signin")
  }

  const data = {
    auth: {
      signin,
      signout,
    },
    user,
  }

  return <AuthContext.Provider value={data} {...props} />
}

export function PrivateRoute(props) {
  // check user exists
  const user = JSON.parse(localStorage.getItem("user"))

  if (!user) return <Navigate to="/signin" />

  return props.children
}
