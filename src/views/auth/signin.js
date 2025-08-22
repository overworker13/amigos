import axios from "axios"
import { Animate, Button, Icon } from "components/lib"
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

export default function Signin() {
  const context = useContext(AuthContext)
  const view = useContext(ViewContext)

  const navigate = useNavigate()
  const [disabled, setDisabled] = useState(false)
  const [user, setUser] = useState({
    phone: "",
    password: "",
  })

  const handleSignin = async () => {
    setDisabled(true)
    user.phone = user.phone.slice(1)
    await axios({
      method: "POST",
      url: "/v1/login",
      data: user,
    })
      .then((res) => {
        const { access_token, user, warehouse } = res.data
        view.notification.show("Успешно!", "success")
        context.auth.signin({ user, access_token, warehouse })
        setDisabled(false)
      })
      .catch((err) => {
        view.notification.show(err.response.data.detail, "error")
        setUser({ ...user, phone: `+${user.phone}` })
        setDisabled(false)
      })
  }

  return (
    <Animate type="fadein">
      <div className="flex flex-col items-center justify-center mt-[20vh]">
        <div className="bg-white flex items-center justify-center p-2 rounded-md overflow-hidden shadow-lg">
          <img
            src="/typed_logo.png"
            alt="logo"
            loading="lazy"
            className="w-[20rem] lg:w-[30rem] object-cover transition-opacity duration-200 ease-in-out"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4 w-[20rem] lg:w-[30rem]">
          <div className="flex flex-col gap-1">
            <label className={style.label}>Телефон</label>
            <PhoneInput
              className={
                "border-2 bg-white px-2 py-1 outline-none rounded-md input-phone-number"
              }
              maxLength={15}
              countries={["RU", "KZ"]}
              international
              defaultCountry="KZ"
              placeholder="Номер телефона"
              value={user?.phone}
              onChange={(v) => setUser({ ...user, phone: v })}
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

          <button
            disabled={disabled}
            onClick={handleSignin}
            className="mt-4 p-2 rounded-sm hover:bg-blue-100 gradient-orange-90 text-white"
          >
            {disabled ? (
              <Icon image="loader" className="animate-spin w-full" size={24} />
            ) : (
              <span>Войти</span>
            )}
          </button>

          <div className="border-b-2 my-2" />

          <div className="flex items-center gap-2 text-sm lg:text-base">
            <span>У вас еще нет аккаунта?</span>

            <span
              className="border-b-2 text-blue-400 border-b-blue-400 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Зарегистрироваться
            </span>
          </div>
        </div>
      </div>
    </Animate>
  )
}
