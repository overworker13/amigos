import axios from "axios"
import { Button, Select } from "components/lib"
import { ViewContext } from "contexts/view"
import React, { useContext, useEffect, useState } from "react"

export default function CreateWarehouseAdminModal({ client, getClients }) {
  const view = useContext(ViewContext)

  const [responsible, setResponsible] = useState({
    user_id: client?.id,
    global_warehouse_id: null,
  })

  const [cities, setCities] = useState([])

  const handleResponsible = async () => {
    await axios({
      method: "POST",
      url: "/v1/create_warehouse_admin",
      data: responsible,
    })
      .then(() => {
        view.notification.show("Успешно назначен", "success")
        view.modal.hide()
        getClients()
      })
      .catch((err) => console.log(err))
  }

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

  useEffect(() => {
    getCities()
  }, [])

  return (
    <div className="grid gap-2">
      <div className="flex flex-col gap-1">
        <label>Выберите город</label>
        <Select
          className="w-full"
          default={responsible.global_warehouse_id}
          options={
            cities.map((c) => ({
              label: c.city,
              value: c.id,
            })) ?? []
          }
          onChange={(v) =>
            setResponsible({ ...responsible, global_warehouse_id: v })
          }
        />
      </div>

      <Button
        className="ml-auto"
        text="Назначить"
        icon="user"
        color="teal"
        onClick={handleResponsible}
      />
    </div>
  )
}
