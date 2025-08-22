import axios from "axios"
import { Button, Search, Card, Table, Select } from "components/lib"
import { ViewContext } from "contexts/view"
import { useContext, useEffect, useState } from "react"

const style = {
  label: "text-gray-700 text-sm lg:text-base ",
  input:
    "w-full text-gray-700 px-2 py-1 rounded-md outline-none border-2 hover:bg-blue-100 ",
}

const perPage = 20

export function EditCargoModal({ getCargos }) {
  const view = useContext(ViewContext)

  const offset = 0
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCargoUsers()
  }, [search])

  const getCargoUsers = async () => {
    setLoading(true)
    await axios({
      method: "GET",
      url: "/v1/get_cargo_users",
      params: {
        limit: perPage,
        offset: offset,
        search: search,
      },
    })
      .then((res) => {
        const users = res.data.warehouse_users.map((user) => {
          return {
            id: user.id,
            code: user.code,
            name: user.name,
            surname: user.surname,
            password: user.password,
            phone: user.phone,
          }
        })
        setUsers([...users])
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  const handleUpdateCargo = async (user_id) => {
    const isConfirmed = window.confirm("Вы уверенны?")
    if (!isConfirmed) return

    await axios({
      method: "PATCH",
      url: "/v1/update_warehouse_admin",
      data: {
        user_id: user_id,
      },
    })
      .then(() => {
        view.modal.hide()
        getCargos()
      })
      .catch((err) => view.notification.show(err.response.data.detail, "error"))
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <Search
            value={search}
            onChange={(text) => setSearch(text)}
            isSearchLoading={loading}
          />
        </div>
      </div>

      <Card className="!p-0 screen-height rounded-md overflow-auto">
        <Table
          data={{
            header: [
              { name: "id", title: "#ID", sort: false },
              { name: "code", title: "Код", sort: false },
              { name: "name", title: "Имя", sort: false },
              { name: "surname", title: "Фамилия", sort: false },
              { name: "password", title: "Пароль", sort: false },
              { name: "phone", title: "Телефон", sort: false },
            ],
            body: users,
          }}
          hide={["role", "warehouse_id"]}
          loading={loading}
          onRowClick={(row) => handleUpdateCargo(row.id)}
        />
      </Card>
    </div>
  )
}
