import axios from "axios"
import { Button, Select } from "components/lib"
import { AuthContext } from "contexts/auth"
import { ViewContext } from "contexts/view"
import React, { useContext, useEffect, useState } from "react"
const style = {
  label: "text-gray-700 text-sm",
  input:
    "text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}
export function EditStatusModal({ row, getStatuses }) {
  const view = useContext(ViewContext)

  const [status, setStatus] = useState({
    status: row.status,
    global_warehouse_id: row?.warehouse_id,
  })

  const [cities, setCities] = useState([])

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

  const handleUpdateStatus = async () => {
    await axios({
      method: "PATCH",
      url: `/v1/update_warehouse_status/${row.id}`,
      data: status,
    })
      .then(() => {
        view.notification.show("Статус успешно обновлен!", "success")
        view.modal.hide()
        getStatuses()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getCities()
  }, [])

  return (
    <div className="grid gap-2 w-full">
      <div className="flex flex-col gap-1 w-full">
        <label className={style.label}>Город</label>
        <Select
          default={status?.global_warehouse_id}
          className="w-full"
          options={cities.map((c) => ({
            label: c.city,
            value: c.id,
          }))}
          onChange={(v) => setStatus({ ...status, global_warehouse_id: v })}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className={style.label}>Статус</label>
        <input
          type="text"
          className={style.input}
          value={status?.status || ""}
          placeholder="Введите статус..."
          onChange={(e) => setStatus({ ...status, status: e.target.value })}
        />
      </div>

      <Button
        text="Сохранить"
        color="teal"
        className="w-fit ml-auto mt-2"
        icon="save"
        onClick={handleUpdateStatus}
      />
    </div>
  )
}
