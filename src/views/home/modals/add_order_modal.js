import axios from "axios"
import { Button } from "components/lib"
import { AuthContext } from "contexts/auth"
import { ViewContext } from "contexts/view"
import React, { useContext, useState } from "react"
const style = {
  label: "text-gray-700 text-sm lg:text-base",
  input:
    "w-full text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}
export function AddOrderModal({ getOrders }) {
  const { user } = useContext(AuthContext)

  const view = useContext(ViewContext)

  const [order, setOrder] = useState({
    track_code: "",
    description: "",
  })

  const handleCreateOrder = async () => {
    await axios({
      method: "POST",
      url: "/v1/create_order",
      data: order,
    })
      .then(() => {
        view.modal.hide()
        getOrders()
      })
      .catch((err) => view.notification.show(err.response.data.detail, "error"))
  }

  return (
    <div className="grid grid-cols-3 items-start gap-4">
      <div className="col-span-1">
        <label className={style.label}>Трек код</label>
      </div>
      <div className="col-span-2">
        <input
          className={style.input}
          value={order?.track_code}
          onChange={(e) => setOrder({ ...order, track_code: e.target.value })}
          placeholder="Введите трек код..."
        />
      </div>

      <div className="col-span-1">
        <label className={style.label}>Описание</label>
      </div>
      <div className="col-span-2">
        <textarea
          className={style.input}
          value={order?.description}
          onChange={(e) => setOrder({ ...order, description: e.target.value })}
          placeholder="Введите трек код..."
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
          onClick={handleCreateOrder}
        />
      </div>
    </div>
  )
}
