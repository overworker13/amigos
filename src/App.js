// components
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { NotFound } from "./views/error/404"
import { AuthProvider, PrivateRoute } from "contexts/auth"
import { View } from "contexts/view"
import axios from "axios"
import Settings from "./data/settings.json"

const routes = [
  ...require("./routes/app").default,
  ...require("./routes/auth").default,
]

export default function App(props) {
  const user = JSON.parse(localStorage.getItem("user"))

  axios.defaults.baseURL = Settings[process.env.NODE_ENV].server_url

  if (user?.token) {
    // add auth token to api header calls
    axios.defaults.headers.common["Authorization"] = "Bearer " + user?.token
  }

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.layout === "app" ? (
                    <PrivateRoute permission={route.permission}>
                      <View
                        display={route.view}
                        layout={route.layout}
                        title={route.title}
                      />
                    </PrivateRoute>
                  ) : (
                    <View
                      display={route.view}
                      layout={route.layout}
                      title={route.title}
                    />
                  )
                }
              />
            )
          })}

          {/* 404 */}
          <Route
            path="*"
            element={
              <View
                display={NotFound}
                layout="home"
                title={"404 Страница не найдена"}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
