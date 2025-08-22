import axios from "axios"
import { Animate, Select } from "components/lib"
import { AuthContext } from "contexts/auth"
import { ViewContext } from "contexts/view"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"

const style = {
  label: "text-gray-700 text-sm",
  input:
    "text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}

export default function SignUp() {
  const context = useContext(AuthContext)
  const view = useContext(ViewContext)

  const navigate = useNavigate()
  const [password2, setPassword2] = useState("")

  const [city, setCity] = useState(null)

  const [user, setUser] = useState({
    phone: "",
    name: "",
    surname: "",
    password: "",
    warehouse_id: null,
    code: "",
  })

  const [cities, setCities] = useState([])
  const [warehouses, setWareHouses] = useState([])

  const handleSignin = async () => {
    user.phone = user.phone.slice(1)

    console.log(user.phone.length)

    if (!user?.phone || user?.phone.length !== 11)
      return view.notification.show("Введите номер телефона", "error")

    if (password2 !== user.password)
      return view.notification.show("Пароли не совпадают", "error")

    if (user.password.length < 5)
      return view.notification.show(
        "Пароль должен иметь как минимум 5 символов",
        "error"
      )

    if (!city) return view.notification.show("Выберите город", "error")

    if (!user?.warehouse_id)
      return view.notification.show("Выберите склад", "error")

    await axios({
      method: "POST",
      url: "/v1/signup",
      data: user,
    })
      .then((res) => {
        const { user, token, message } = res.data
        view.notification.show(message ?? "Успешно!", "success")
        context.auth.signin({ user, token })

        return (window.location = "/")
      })
      .catch((err) => {
        view.notification.show(err.response.data.detail, "error")
      })
  }

  const getCities = async () => {
    await axios({
      method: "GET",
      url: "/v1/global_warehouses",
    })
      .then((res) => {
        setCities([...res.data.global_warehouses])
      })
      .catch((err) => console.log(err))
  }

  const getWareHouses = async (city) => {
    await axios({
      method: "GET",
      url: "/v1/local_warehouses",
      params: {
        city_id: city,
      },
    })
      .then((res) => {
        const warehouses = res.data.local_warehouses.filter(
          (w) => !w.deleted_at
        )
        console.log(warehouses)
        setWareHouses([...warehouses])
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getCities()
  }, [])

  useEffect(() => {
    getWareHouses(city)
  }, [city])

  return (
    <Animate type="fadein">
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 w-[20rem] lg:w-[30rem] bg-white p-6">
            <div className="flex flex-col gap-1">
              <label className={style.label}>Телефон</label>
              <PhoneInput
                className={
                  "border-2 bg-white px-2 py-1 outline-none rounded-md"
                }
                defaultCountry="KZ"
                maxLength={15}
                international
                placeholder="Номер телефона"
                value={user?.phone}
                onChange={(v) => setUser({ ...user, phone: v })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={style.label}>Выберите свой город</label>
              <Select
                default={city}
                placeholder="Выберите свой город..."
                options={cities.map((c) => ({
                  label: c.name,
                  value: c.id,
                }))}
                onChange={(v) => setCity(v)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={style.label}>Выберите карго</label>
              <Select
                default={user?.warehouse_id}
                placeholder="Выберите карго"
                options={warehouses.map((w) => ({
                  label: w.name,
                  value: w.id,
                }))}
                onChange={(v) => {
                  setUser({
                    ...user,
                    warehouse_id: v,
                    code: warehouses.find((w) => +w.id === +v)?.code,
                  })
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className={style.label}>Имя</label>
              <input
                type="text"
                className={style.input}
                value={user?.name || ""}
                placeholder="Введите Имя..."
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={style.label}>Фамилия</label>
              <input
                type="text"
                className={style.input}
                value={user?.surname || ""}
                placeholder="Введите Фамилию..."
                onChange={(e) => setUser({ ...user, surname: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={style.label}>Пароль</label>
              <input
                type="password"
                className={style.input}
                value={user?.password || ""}
                placeholder="Введите пароль..."
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className={style.label}>Повторите пароль</label>
              <input
                type="password"
                className={style.input}
                value={password2 || ""}
                placeholder="Повторите пароль..."
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>
            <button
              onClick={handleSignin}
              className="mt-4 bg-white p-2 rounded-md hover:bg-blue-100 gradient-orange-90 text-white"
            >
              Регистрация
            </button>

            <div className="border-b-2 my-2" />

            <div className="flex items-center gap-2 text-sm lg:text-base">
              <span>Вы уже зарегистрированы?</span>

              <span
                className="border-b-2 text-blue-400 border-b-blue-400 cursor-pointer"
                onClick={() => navigate("/signin")}
              >
                Войти
              </span>
            </div>
          </div>
        </div>
      </div>
    </Animate>
  )
}
