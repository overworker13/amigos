import axios from "axios"
import {
  Animate,
  Back,
  Button,
  Card,
  Icon,
  Paginate,
  Table,
} from "components/lib"
import { ViewContext } from "contexts/view"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateFormat } from "utils/DateFormat"
const perPage = 10

const ROLES = Object.freeze({
  0: "Клиент",
  1: "Админ Склада",
  2: "Владелец Карго",
  3: "Супер Админ",
})

export default function Trash() {
  const navigate = useNavigate()
  const view = useContext(ViewContext)

  const [clients, setClients] = useState([])

  //filter states
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [searching, setSearching] = useState(false)

  const getDeletedClients = async () => {
    setLoading(true)
    await axios({
      method: "GET",
      url: "/v1/get_deleted_users",
      params: {
        limit: perPage,
        offset: offset,
        search: search,
      },
    })
      .then((res) => {
        const users = res.data.deleted_users.map((u) => ({
          id: u.id,
          code: u.code,
          name: u.name,
          surname: u.surname,
          phone: u.phone,
          password: u.password,
          role: ROLES[u.role],
          warehouse: u.warehouse,
          warehouse_id: u.warehouse_id,
          user_role: u.role,
          deleted_at: DateFormat(u.deleted_at),
        }))
        setClients([...users])
        setTotal(res.data.total_count)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const activateUser = async (user) => {
    await axios({
      method: "PATCH",
      url: `/v1/activate_deleted_user/${user?.id}`,
    })
      .then(() => {
        view.notification.show("Пользователь успешно активирован!", "success")
        getDeletedClients()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getDeletedClients()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, offset])

  return (
    <Animate type="pop">
      <div className="flex flex-col gap-4 overflow-hidden">
        <Back />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg w-fit relative">
              <Icon image="search" />
              <input
                className="!w-[40vh] outline-0 text-sm text-gray-500"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {searching && <Icon image="loader" className="animate-spin" />}
            </div>
            <Button text="Найти" color="green" />
          </div>
        </div>

        <div className="border-b border-b-gray-300" />
        <Paginate
          className={"ml-auto"}
          total={total ?? 0}
          offset={offset}
          limit={perPage}
          onChange={setOffset}
        />
        <Card className="!p-0 screen-height rounded-md overflow-auto">
          <Table
            hide={["id", "warehouse_id", "user_role"]}
            data={{
              header: [
                { name: "code", title: "Код клиента", sort: true },
                { name: "name", title: "Имя", sort: true },
                { name: "surname", title: "Фамилия", sort: true },
                { name: "phone", title: "Телефон", sort: false },
                { name: "password", title: "Пароль", sort: true },
                { name: "role", title: "Роль", sort: true },
                { name: "warehouse", title: "Склад", sort: true },
                { name: "deleted_at", title: "Был удален", sort: true },
              ],
              body: clients,
            }}
            loading={loading}
            actions={{
              activate: activateUser,
            }}
          />
        </Card>
      </div>
    </Animate>
  )
}
