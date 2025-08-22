import { Animate, Button, Icon } from "components/lib"
import { AuthContext } from "contexts/auth"
import { ViewContext } from "contexts/view"
import { getMenu } from "layout/menu"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AddOrderModal, CargoInformationModal } from "./modals"
import axios from "axios"
import { DateFormat } from "utils/DateFormat"
import { FaWhatsapp, FaInstagram, FaTelegramPlane } from "react-icons/fa"

const SOCIALS = {
  instagram: "https://www.instagram.com/amigos.logistics",
  whatsapp:
    "https://wa.me/+77473857705?text=Доброго%20времени%20суток,%20хотел%20бы%20получить%20консультацию!",
  telegram: "https://t.me/+oue_3UvimU9iN2Ri",
}

export default function MainPage() {
  const { user } = useContext(AuthContext)

  const menu = getMenu(user?.role)

  const navigate = useNavigate()

  const view = useContext(ViewContext)

  const [search, setSearch] = useState(null)
  const [searching, setSearching] = useState(false)
  const [clientOrders, setClientOrders] = useState([])

  const MODAL_ACTIONS = {
    "add-order": () => {
      console.log("here")
      view.modal.show({
        title: "Создание Заказа",
        children: <AddOrderModal getOrders={getOrders} />,
      })
    },
    information: () => {
      view.modal.show({
        children: <CargoInformationModal />,
      })
    },
  }

  const getOrders = async () => {
    await axios({
      method: "GET",
      url: "/v1/get_my_tracks",
    })
      .then((res) => {
        setClientOrders([...res.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleClick = (social) => {
    window.open(SOCIALS[social], "_blank")
  }

  useEffect(() => {
    if (user?.role === 0) {
      getOrders()
    }
  }, [])

  return (
    <Animate type="pop">
      {+user?.role === 0 && (
        <div className="flex items-center justify-between md:justify-normal gap-2 w-full pb-4">
          <button
            className="flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-3 py-1 text-center"
            onClick={() => handleClick("instagram")}
          >
            <span>Instagram</span>
            <FaInstagram color="white" />
          </button>
          <button
            className="flex items-center gap-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-3 py-1 text-center"
            onClick={() => handleClick("whatsapp")}
          >
            <span>Whatsapp</span>
            <FaWhatsapp color="white" />
          </button>
          <button
            className="flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 !py-1 text-center"
            onClick={() => handleClick("telegram")}
          >
            <span>Telegram</span>
            <FaTelegramPlane color="white" />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {menu.map((m, index) => (
          <div
            key={index}
            onClick={() => {
              if (MODAL_ACTIONS[m.link]) {
                MODAL_ACTIONS[m.link]()
              } else {
                navigate(m.link)
              }
            }}
            className={`p-8 bg-white font-bold rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all duration-200 ease-in-out hover:-translate-y-1 ${
              m.bg ?? ""
            }`}
          >
            <div className="flex items-center gap-2">
              <Icon image={m.icon} />
              <span>{m.label}</span>
            </div>
          </div>
        ))}
      </div>
      {user?.role === 0 && (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center gap-2 w-full">
            <div className="flex items-center gap-2 bg-white p-2 rounded-lg w-full relative">
              <Icon image="search" />
              <input
                className="w-full outline-0 text-sm text-gray-500"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {searching && <Icon image="loader" className="animate-spin" />}
            </div>
            <Button
              text="Найти"
              color="green"
              icon="search"
              className="!p-2"
              onClick={getOrders}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clientOrders.map((c, index) => (
              <div
                key={index}
                className="flex flex-col h-fit rounded-md overflow-hidden text-white font-medium text-sm shadow-lg cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-1"
              >
                <div className="flex items-center justify-between bg-red-400 p-2">
                  <span>{c.track?.track_code}</span>
                  <Icon
                    image="trash"
                    size={24}
                    className="hover:text-red-500"
                  />
                </div>

                <div className="p-2 bg-white flex flex-col text-black">
                  <span>{c.track.description}</span>
                </div>

                <div className="border-b border-b-slate-300" />
                <div className="p-2 bg-white flex flex-col text-black">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center p-2 rounded-full border bg-green-500">
                      <Icon image="check" color="white" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-thin">
                        Дата регистрации клиентом
                      </span>
                      <span>{DateFormat(c.track.created_at)}</span>
                    </div>
                  </div>
                </div>
                <div className="border-b border-b-slate-300" />
                {c.track_history.map((th, i) => (
                  <>
                    <div className="border-b border-b-slate-300" />
                    <div className="p-2 bg-white flex flex-col text-black">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center p-2 rounded-full border bg-green-500">
                          <Icon image="check" color="white" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-thin">{th.status_name}</span>
                          <span>{DateFormat(th.created_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="border-b border-b-slate-300" />
                  </>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </Animate>
  )
}
