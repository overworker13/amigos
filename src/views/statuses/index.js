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
import { CreateStatusModal, EditStatusModal } from "./modals"
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
export default function Statuses() {
  const view = useContext(ViewContext)
  //filter states
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)
  const [searching, setSearching] = useState(false)

  const [statuses, setStatuses] = useState([])

  const handleCreateStatus = () => {
    view.modal.show({
      title: "Добавить статус",
      children: <CreateStatusModal getStatuses={getStatuses} />,
    })
  }

  const getStatuses = async () => {
    await axios({
      method: "GET",
      url: "/v1/get_city_status",
    })
      .then((res) => {
        const statuses = res.data.statuses.map((r) => ({
          id: r.id,
          status: r.status,
          warehouse: r.warehouse,
          warehouse_id: r.warehouse_id,
          created_at: DateFormat(r.created_at),
        }))
        setStatuses([...statuses])
      })
      .catch((err) => console.log(err))
  }

  const editRow = (row) => {
    view.modal.show({
      title: "Редактировать статус",
      children: <EditStatusModal row={row} getStatuses={getStatuses} />,
    })
  }

  const deleteRow = async (row) => {
    if (!window.confirm("Вы уверены?")) return

    await axios({
      method: "DELETE",
      url: `/v1/delete_warehouse_status/${row?.id}`,
    })
      .then(() => {
        view.notification.show("Статус успешно удален!", "success")
        getStatuses()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getStatuses()
  }, [])

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
              onClick={handleCreateStatus}
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
            hide={["warehouse_id"]}
            data={{
              header: [
                { name: "id", title: "#ID", sort: true },
                { name: "status", title: "Статус", sort: true },
                { name: "warehouse", title: "Склад", sort: false },
                { name: "created_at", title: "Дата создания", sort: true },
              ],
              body: statuses,
            }}
            loading={loading}
            actions={{
              edit: editRow,
              delete: deleteRow,
            }}
          />
        </Card>
      </div>
    </Animate>
  )
}
