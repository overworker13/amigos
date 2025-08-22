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
import CreateWarehouseModal from "./modals/create_warehouse_modal"
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
export default function Warehouses() {
  const navigate = useNavigate()

  const view = useContext(ViewContext)

  const [warehouses, setWareHouses] = useState([])

  //filter states
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [searching, setSearching] = useState(false)

  const getWareHouses = async () => {}

  const handleCreateWarehouse = () => {
    view.modal.show({
      title: "Создание склада",
      children: <CreateWarehouseModal />,
    })
  }
  const editRow = () => {}
  const deleteRow = () => {}

  return (
    <Animate type="pop">
      <div className="flex flex-col gap-4 overflow-hidden">
        <Back />

        <div className="flex items-center flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap items-center gap-2">
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

          <div className="flex flex-wrap items-center gap-2">
            <Button
              text="Добавить"
              color="teal"
              icon="plus"
              onClick={handleCreateWarehouse}
            />
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
            data={{
              header: [
                { name: "id", title: "#ID", sort: true },
                { name: "role", title: "Роль", sort: true },
              ],
              body: warehouses ?? [],
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
