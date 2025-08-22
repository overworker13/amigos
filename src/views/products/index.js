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
import ChangeStatusModal from "./modals/change_status_modal"
import { AuthContext } from "contexts/auth"

const perPage = 10

export default function Products() {
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  const context = useContext(ViewContext)

  const [products, setProducts] = useState([])

  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    getCargoTracks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, offset])

  const getCargoTracks = async () => {
    setLoading(true)
    await axios({
      method: "GET",
      url: "/v1/get_cargo_tracks",
      params: {
        limit: perPage,
        offset: offset,
        search: search,
      },
    })
      .then((res) => {
        const products = res.data.tracks.map((tr) => ({
          id: tr.id,
          code: tr.code,
          name: tr.name,
          surname: tr.surname,
          phone: tr.phone,
          track_code: tr.track_code,
          description: tr.description,
          created_at: DateFormat(tr.created_at),
          updated_at: tr.updated_at ? DateFormat(tr.updated_at) : "---",
          status: tr.status ?? "",
          is_accepted: tr.is_accepted ? "Принят" : "Не принят",
        }))
        setProducts(products)
        setTotal(res.data.total)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const editRow = (row) => {
    context.modal.show({
      title: "Обновление статуса",
      children: (
        <ChangeStatusModal track_id={row.id} getCargoTracks={getCargoTracks} />
      ),
    })
  }

  const accept = async (row) => {
    await axios({
      method: "PATCH",
      url: `/v1/accept_track_status/${row.id}`,
    })
      .then(() => context.notification.show("Успешно принят!", "success"))
      .catch((err) => console.log(err))
  }

  const ACTIONS = {
    1: { edit: editRow, accept: accept },
    2: { edit: editRow, accept: accept },
    3: { edit: editRow },
    4: { edit: editRow },
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
            hide={["id"]}
            data={{
              header: [
                { name: "code", title: "Код", sort: true },
                { name: "name", title: "Имя", sort: true },
                { name: "surname", title: "Фамилия", sort: false },
                { name: "phone", title: "Телефон", sort: false },
                { name: "track_code", title: "Трек код", sort: false },
                { name: "description", title: "Описание", sort: false },
                { name: "created_at", title: "Дата Создания", sort: true },
                { name: "updated_at", title: "Дата Обновления", sort: true },
                { name: "status", title: "Статус", sort: false },
                { name: "is_accepted", title: "Карго Статус", sort: false },
              ],
              body: products,
            }}
            loading={loading}
            actions={ACTIONS[user?.role]}
          />
        </Card>
      </div>
    </Animate>
  )
}
