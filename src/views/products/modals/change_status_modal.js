import axios from 'axios'
import { Button, Select } from 'components/lib'
import { ViewContext } from 'contexts/view'
import { useContext, useEffect, useState } from 'react'

const style = {
  label: "text-gray-700 text-sm lg:text-base ",
  input:
    "w-full text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}

const ChangeStatusModal = ({ track_id, getCargoTracks }) => {
  const view = useContext(ViewContext)

  const [status, setStatus] = useState(null);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    await axios({
      method: "GET",
      url: "/v1/get_city_status",
    })
      .then((res) => {
        setStatuses([...res.data.statuses]);
      })
      .catch((err) => view.notification.show(err.response.data.detail, "error"))
  };

  const handleSaveStatus = async () => {
    if(status === null) {
      view.notification.show("Выберите статус", "error");
      return;
    }

    await axios({
      method: "POST",
      url: "/v1/update_track_status",
      data: {
        track_id: track_id,
        status_id: status
      },
    })
      .then(() => {
        view.modal.hide()
        getCargoTracks()
      })
      .catch((err) => view.notification.show(err.response.data.detail, "error"))
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className={style.label}>Город</label>
        <Select
          default={status}
          placeholder="Выберите статус"
          options={statuses.map((c) => ({
            label: c.status,
            value: c.id,
          }))}
          onChange={(v) => setStatus(Number(v))}
          className="w-full"
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
          onClick={handleSaveStatus}
        />
      </div>
    </div>
  )
}

export default ChangeStatusModal