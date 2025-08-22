import axios from "axios"
import { Button, Select } from "components/lib"
import { ViewContext } from "contexts/view"
import React, { useContext, useEffect, useState } from "react"
const style = {
  label: "text-gray-700 text-sm",
  input:
    "text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}
export default function EditStorageModal({ storage, getCargos }) {
  const view = useContext(ViewContext)
  const [cargo, setCargo] = useState({
    city_id: storage?.city_id,
    name: storage?.name,
    code: storage?.code,
    address: storage?.address,
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

  const handleUpdate = async () => {
    await axios({
      method: "PATCH",
      url: `/v1/update_cargo/${storage.id}`,
      data: cargo,
    })
      .then(() => {
        view.notification.show("Успешно обновлен!", "success")
        view.modal.hide()
        getCargos()
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getCities()
  }, [])

  return (
    <div className="grid gap-2 w-full">
      <div className="flex flex-col gap-1 w-full">
        <label className={style.label}>Город</label>
        <Select
          default={cargo?.city_id}
          className="w-full"
          options={cities.map((c) => ({
            label: c.city,
            value: c.id,
          }))}
          onChange={(v) => setCargo({ ...cargo, city_id: v })}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className={style.label}>Статус</label>
        <input
          type="text"
          className={style.input}
          value={cargo?.name || ""}
          placeholder="Введите название склада..."
          onChange={(e) => setCargo({ ...cargo, name: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className={style.label}>Адрес</label>
        <input
          type="text"
          className={style.input}
          value={cargo?.address || ""}
          placeholder="Введите адрес склада..."
          onChange={(e) => setCargo({ ...cargo, address: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label className={style.label}>Код</label>
        <input
          type="text"
          className={style.input}
          value={cargo?.code || ""}
          placeholder="Введите адрес склада..."
          onChange={(e) => setCargo({ ...cargo, code: e.target.value })}
        />
      </div>

      <Button
        text="Сохранить"
        icon="save"
        className="ml-auto mt-2"
        color="teal"
        onClick={handleUpdate}
      />
    </div>
  )
}
