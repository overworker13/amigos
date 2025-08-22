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
import { AuthContext } from "contexts/auth"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateFormat } from "utils/DateFormat"
const perPage = 10

const ROLES = Object.freeze({
  0: "Клиент",
  1: "Менеджер Склада",
  2: "Админ склада",
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
export default function Orders() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const [cargoOrders, setCargoOrders] = useState([])

  //filter states
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [searching, setSearching] = useState(false)

  const getCargoOrders = async () => {
    setLoading(true)
    await axios({
      method: "GET",
      url: "/v1/get_cargo_orders",
      params: {
        cargo_id: user?.cargo_id,
        limit: perPage,
        offset,
      },
    })
      .then((res) => {
        const orders = res.data.orders.map((r) => ({
          id: r.id,
          track_code: r.track_code,
          status: r.status_id ?? "---",
          description: r.description,
          client: r.fullname,
          client_code: r.user_code,
          phone: r.user_phone,
          created_at: DateFormat(r.created_at),
        }))
        setCargoOrders([...res.data.orders])
        setTotal(res.data.total)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const editRow = () => {}
  const deleteRow = () => {}

  useEffect(() => {
    getCargoOrders()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, offset])

  return (
    <Animate type="pop">
      <div className="flex flex-col gap-4 overflow-hidden">
        <Back />

        {/* <div className="flex items-center justify-between">
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
        </div> */}

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
            data={{
              header: [
                { name: "id", title: "#ID", sort: true },
                { name: "track_code", title: "Трек код", sort: true },
                { name: "status", title: "Статус", sort: true },
                { name: "description", title: "Описание", sort: false },
                { name: "client", title: "Клиент", sort: false },
                { name: "client_code", title: "Код", sort: false },
                { name: "phone", title: "Телефон", sort: false },
                { name: "created_at", title: "Дата создания", sort: false },
              ],
              body: cargoOrders,
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
