import axios from "axios"
import {
  Animate,
  Back,
  Button,
  Card,
  Icon,
  Paginate,
  Search,
  Table,
} from "components/lib"
import { ViewContext } from "contexts/view"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DateFormat } from "utils/DateFormat"
import { AddCargoModal } from "./modals/add_cargo_modal"
import { EditCargoModal } from "./modals/edit_cargo_modal"
import EditStorageModal from "./modals/edit_storage_modal"

const perPage = 10

export default function Cargos() {
  const navigate = useNavigate()
  const context = useContext(ViewContext)

  const [cargos, setCargos] = useState([])

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getCargos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, offset])

  const getCargos = async () => {
    setLoading(true)
    await axios({
      method: "GET",
      url: "/v1/get_cargo_list",
      params: {
        limit: perPage,
        offset: offset,
        search: search,
      },
    })
      .then((res) => {
        const cargos = res.data.cargo_list.map((cargo) => ({
          ...cargo,
          created_at: DateFormat(cargo.created_at, "d:m:Y H:i"),
        }))
        setCargos(cargos)
        setTotal(res.data.total)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleAddModal = () => {
    context.modal.show({
      title: "Создание Карго",
      children: <AddCargoModal getCargos={getCargos} />,
    })
  }

  const editRow = (row) => {
    context.modal.show({
      title: "Назначить ответственного",
      children: <EditCargoModal storage={row} getCargos={getCargos} />,
    })
  }

  const updateRow = (row) => {
    context.modal.show({
      title: "Редактирование склада",
      children: <EditStorageModal storage={row} getCargos={getCargos} />,
    })
  }

  const deleteRow = async (row) => {
    if (!window.confirm("Вы уверены?")) return

    await axios({
      method: "DELETE",
      url: `/v1/delete_cargo/${row.id}`,
    })
      .then(() => {
        context.notification.show("Успешно удален!", "success")
        getCargos()
      })
      .catch((err) => console.log(err))
  }

  return (
    <Animate type="pop">
      <div className="flex flex-col gap-4 overflow-hidden">
        <Back />

        <div className="flex items-center flex-wrap gap-2 justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Search
              value={search}
              onChange={(text) => setSearch(text)}
              wrapperClassName="bg-white rounded-md border-slate-300 "
              isSearchLoading={loading}
            />
            <Button color="green" text="Найти" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              icon="plus"
              color="teal"
              text="Добавить"
              onClick={() => handleAddModal()}
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
                { name: "city_name", title: "Город", sort: true },
                { name: "code", title: "Код", sort: false },
                { name: "address", title: "Адресс", sort: false },
                { name: "name", title: "Название Карго", sort: false },
                { name: "fio", title: "Ответственный", sort: false },
                { name: "created_at", title: "Дата Создания", sort: true },
              ],
              body: cargos,
            }}
            hide={["updated_at", "city_id"]}
            loading={loading}
            actions={{
              edit: updateRow,
              responsible: editRow,
              delete: deleteRow,
            }}
          />
        </Card>
      </div>
    </Animate>
  )
}
