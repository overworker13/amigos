import axios from "axios"
import { Button, Select } from "components/lib"
import { ViewContext } from "contexts/view"
import { useContext, useEffect, useState } from "react"

const style = {
  label: "text-gray-700 text-sm lg:text-base ",
  input:
    "w-full text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}

export function AddCargoModal({ getCargos }) {
  const view = useContext(ViewContext)

  const [cities, setCities] = useState([])
  const [cargo, setCargo] = useState({
    city_id: null,
    name: "",
    code: "",
    address: "",
  })

  useEffect(() => {
    getCities();
  }, [])

  const getCities = async () => {
    await axios({
      method: "GET",
      url: "/v1/global_warehouses",
    })
      .then((res) => {
        setCities([...res.data.global_warehouses])
      })
      .catch((err) => console.log(err))
  };

  const handleCreateCargo = async () => {
    if(cargo.name.length === 0 || cargo.address.length === 0 || cargo.code.length === 0 || cargo.city_id === null) {
      view.notification.show("Заполните все поля", "error");
      return;
    }

    await axios({
      method: "POST",
      url: "/v1/create_local_warehouse",
      data: cargo,
    })
      .then(() => {
        view.modal.hide()
        getCargos()
      })
      .catch((err) => view.notification.show(err.response.data.detail, "error"))
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className={style.label}>Город</label>
        <Select
          default={cargo.city_id}
          placeholder="Выберите город"
          options={cities.map((c) => ({
            label: c.name,
            value: c.id,
          }))}
          onChange={(v) => setCargo({ ...cargo, city_id: v })}
          className="w-full"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={style.label}>Название</label>
        <input
          className={style.input}
          value={cargo.name}
          onChange={(e) => setCargo({ ...cargo, name: e.target.value })}
          placeholder="Введите название..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={style.label}>Код</label>
        <input
          className={style.input}
          value={cargo.code}
          onChange={(e) => setCargo({ ...cargo, code: e.target.value })}
          placeholder="Введите код..."
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className={style.label}>Адрес</label>
        <input
          className={style.input}
          value={cargo.address}
          onChange={(e) => setCargo({ ...cargo, address: e.target.value })}
          placeholder="Введите адрес..."
        />
      </div>


      <div className="col-span-3 flex ml-auto gap-2">
        <Button
          text="Закрыть"
          color="red"
          className=""
          icon="x"
          onClick={() => view.modal.hide()}
        />
        <Button
          text="Добавить"
          color="green"
          className=""
          icon="save"
          onClick={handleCreateCargo}
        />
      </div>
    </div>
  )
}
