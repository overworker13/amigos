import { AuthContext } from "contexts/auth"
import { Fragment, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Container } from "components/lib"
const ROLES = Object.freeze({
  0: "Клиент",
  1: "Админ Склада",
  2: "Владелец Карго",
  3: "Супер Админ",
  4: "Супер менеджер"
})
export function AppLayout(props) {
  const context = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <Fragment>
      <nav className="flex fixed top-0 left-0 w-full h-[5em] px-4 bg-white z-50">
        <div className="flex items-center justify-end sm:justify-between w-full">
          <img
            src="typed_logo.png"
            alt="logo"
            className="w-24 md:w-44 bg-cover cursor-pointer max-sm:hidden"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center gap-2 text-sm ">
            <span className="text-xs md:text-sm bg-gray-200 px-2 py-1 rounded-lg font-bold text-gray-500 whitespace-nowrap">
              {context?.user?.code}
            </span>
            <span className="text-xs md:text-sm font-bold px-2 py-1 bg-gray-200 rounded-md text-gray-500">
              {context.user?.name}-{ROLES[context.user?.role]}
            </span>
            <div className="border-r-2 border-r-gray-300 h-[1em]" />
            <div
              className="text-red-500 cursor-pointer text-sm font-semibold border-b border-b-transparent hover:border-b-red-400"
              onClick={() => context.auth?.signout()}
            >
              Выйти
            </div>
          </div>
        </div>
      </nav>
      <main className="bg-zinc-200 bg-cover bg-center bg-fixed w-full min-h-screen pt-[5em]">
        <Container>{<props.children {...props.data} />}</Container>
      </main>
    </Fragment>
  )
}
