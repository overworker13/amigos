import axios from "axios"
import {
  Animate,
  Back,
  Button,
  Card,
  Icon,
  Paginate,
  Select,
  Table,
} from "components/lib"
import { ViewContext } from "contexts/view"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateFormat } from "utils/DateFormat"
import CreateWarehouseAdminModal from "./modals/create_warehouse_admin"
const perPage = 10

const ROLES = Object.freeze({
  0: "Клиент",
  1: "Админ Склада",
  2: "Владелец Карго",
  3: "Супер Админ",
})

const STATUSES = [
  {
    label: "Активен",
    color: "green",
    value: 1,
  },
  {
    label: "Не активен",
    color: "red",
    value: 0,
  },
]
export default function Clients() {
  const navigate = useNavigate()
  const view = useContext(ViewContext)

  const [clients, setClients] = useState([])

  //filter states
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [searching, setSearching] = useState(false)

  const getClients = async () => {
    setLoading(true)
    await axios({
      method: "GET",
      url: "/v1/get_cargo_users",
      params: {
        limit: perPage,
        offset: offset,
        search: search,
      },
    })
      .then((res) => {
        const users = res.data.warehouse_users.map((u) => ({
          id: u.id,
          code: u.code,
          name: u.name,
          surname: u.surname,
          phone: u.phone,
          password: u.password,
          role: ROLES[u.role],
        }))
        setClients([...users])
        setTotal(res.data.total)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const editRow = (client) => {
    view.modal.show({
      title: "Назначить ответственным",
      children: (
        <CreateWarehouseAdminModal client={client} getClients={getClients} />
      ),
    })
  }
  const deleteRow = () => {}

  useEffect(() => {
    getClients()
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

          {/* <div className="flex items-center gap-2">
            <Button
              text="Корзина"
              color="red"
              icon="trash"
              onClick={() => navigate("/trash")}
            />
            <Button text="Добавить" color="teal" icon="plus" />
          </div> */}
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
            hide={["id"]}
            data={{
              header: [
                { name: "code", title: "Код клиента", sort: true },
                { name: "name", title: "Имя", sort: true },
                { name: "surname", title: "Фамилия", sort: true },
                { name: "phone", title: "Телефон", sort: false },
                { name: "password", title: "Пароль", sort: true },
                { name: "role", title: "Роль", sort: true },
              ],
              body: clients,
            }}
            loading={loading}
            actions={{
              edit: editRow,
              // delete: deleteRow,
            }}
          />
        </Card>
      </div>
    </Animate>
  )
}
