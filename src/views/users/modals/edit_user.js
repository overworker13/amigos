import React, { useContext, useEffect, useState } from "react"
import "react-phone-number-input/style.css"
import PhoneInput from "react-phone-number-input"
import { Select } from "components/lib"
import axios from "axios"
import { ViewContext } from "contexts/view"

const style = {
  label: "text-gray-700 text-sm",
  input:
    "text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}

const ROLES = [
  { value: 0, label: "Клиент" },
  { value: 1, label: "Менеджер Склада" },
  { value: 2, label: "Владелец Склада" },
  { value: 3, label: "Cупер Админ" },
  { value: 4, label: "Cупер Завсклад" },
]

export default function EditUserModal({ client, getClients, warehouses }) {
  const view = useContext(ViewContext)
  const [user, setUser] = useState({
    name: client.name,
    surname: client.surname,
    password: client.password,
    phone: `+${client.phone}`,
    warehouse_id: +client.warehouse_id,
    role: +client.user_role,
  })

  const handleUpdate = async () => {
    await axios({
      method: "PATCH",
      url: `/v1/update_user/${client?.id}`,
      data: {
        ...user,
        phone: user.phone.slice(1),
      },
    })
      .then(() => {
        view.notification.show("Клиент успешно обновлен!", "success")

        view.modal.hide()
        getClients()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    console.log(client)
  }, [])

  return (
    <div className="flex flex-col gap-2">
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
          type="text"
          className={style.input}
          value={user?.password || ""}
          placeholder="Введите пароль..."
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={style.label}>Телефон</label>
        <PhoneInput
          className={"border-2 bg-white px-2 py-1 outline-none rounded-md"}
          defaultCountry="KZ"
          maxLength={15}
          international
          placeholder="Номер телефона"
          value={user?.phone}
          onChange={(v) => setUser({ ...user, phone: v })}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={style.label}>Склад</label>
        <Select
          className="w-full"
          default={user?.warehouse_id}
          placeholder="Выберите склад"
          options={warehouses ?? []}
          onChange={(v) => {
            setUser({
              ...user,
              warehouse_id: v,
            })
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={style.label}>Роль</label>
        <Select
          className="w-full"
          default={user?.role}
          placeholder="Выберите роль"
          options={ROLES ?? []}
          onChange={(v) => {
            setUser({
              ...user,
              role: v,
            })
          }}
        />
      </div>

      <button
        onClick={handleUpdate}
        className="mt-4 bg-white p-2 rounded-md hover:bg-blue-100 gradient-orange-90 text-white"
      >
        Сохранить
      </button>
    </div>
  )
}
