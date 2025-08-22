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
export function CreateStatusModal({ getStatuses }) {
  const [cities, setCities] = useState([])

  const view = useContext(ViewContext)
  const { user } = useContext(AuthContext)

  const [status, setStatus] = useState({
    status: "",
    local_warehouses_id: user?.warehouse_id,
    global_warehouse_id: null,
  })

  const getCities = async () => {
    await axios({
      method: "GET",
      url: "/v1/global_warehouses",
    })
      .then((res) => {
        setCities([...res.data.global_warehouses])
        getStatuses()
      })
      .catch((err) => console.log(err))
  }

  const handleCreateStatus = async () => {
    await axios({
      method: "POST",
      url: "/v1/create_city_status",
      data: status,
    })
      .then(() => {
        view.notification.show("Статус успешно создан!", "success")
        view.modal.hide()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        text="Добавить"
        className="w-fit ml-auto mt-2"
        icon="plus"
        onClick={handleCreateStatus}
      />
    </div>
  )
}
