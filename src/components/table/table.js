/***
 *
 *   TABLE
 *   data: array of objects for body and header (optional)
 *   search: bool to show the search field
 *   sort: allow the table columns to be sorted
 *   loading: bool to toggle loading spinner
 *   badge - object containing column name and color to add badges to column
 *   show - array of columns (object key names) to show (shows all if not provided)
 *   hide - array of columns (object key names) to hide
 *   actions: object with edit/delete keys set to callback functions (optional)
 *
 **********/

import { Fragment, useState, useEffect } from "react"
import { ClassHelper, Icon } from "components/lib"
import { Header } from "./header"
import { Body } from "./body"
import Style from "./table.tailwind.js"
import { Loader2, LoaderCircleIcon, LoaderPinwheel } from "lucide-react"

export function Table(props) {
  // state
  const [header, setHeader] = useState(null)
  const [body, setBody] = useState(null)
  const [filter, setFilter] = useState(false)

  useEffect(() => {
    if (props.data) {
      // create the headers
      let header = props.data.header || []
      let body = props.data.header ? props.data.body : props.data

      if (!header.length) {
        for (let key in props.data[0]) {
          header.push({
            name: key,
            title: key.replace("_", " "),
            sort: key === "actions" ? false : true,
          })
        }
      }

      setBody(body)
      setHeader(header)
    }
  }, [props.data])

  // loading
  if (props.loading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex items-center gap-2">
          <span className="animate-pulse font-semibold">Загрузка...</span>
          <LoaderPinwheel color="black" className="animate-spin" />
        </div>
      </div>
    )
  }

  // no data
  if (!header && !body) return false

  function sort(column, direction) {
    const rows = filter.length ? [...filter] : [...body]

    rows.sort(function (a, b) {
      if (a[column] != null && b[column] != null) {
        a[column].badge ? (a = a[column].label) : (a = a[column])

        b[column].badge ? (b = b[column].label) : (b = b[column])

        if (direction === "desc") {
          if (a > b) return -1
          if (a < b) return 1
          else return 0
        } else {
          if (a < b) return -1
          if (a > b) return 1
          else return 0
        }
      } else {
        return false
      }
    })

    filter ? setFilter(rows) : setBody(rows)
  }

  function editRowCallback(res, row) {
    let state = [...body]
    let stateRow = state[state.findIndex((x) => x.id === row.id)]
    Object.keys(res).map((key) => (stateRow[key] = res[key].value))
    setBody(state)
  }

  function deleteRowCallback(res, row) {
    let state = [...body]
    state.splice(
      state.findIndex((x) => x.id === row.id),
      1
    )
    setBody(state)
  }

  const tableStyle = ClassHelper(Style, {
    table: true,
  })

  return (
    <Fragment>
      <table
        className={
          props.className + " relative " + (!props.naked && tableStyle)
        }
      >
        {header && (
          <Header
            data={header}
            callback={sort}
            show={props.show}
            hide={props.hide}
            actions={props.actions}
          />
        )}
        {body && (
          <Body
            data={filter ? filter : body}
            show={props.show}
            hide={props.hide}
            badge={props.badge}
            onRowClick={props.onRowClick}
            onRightClick={props.onRightClick}
            dynamicUrl={props.dynamicUrl}
            enableNavigate={props.enableNavigate}
            actions={{
              edit: props.actions?.edit,
              view: props.actions?.view,
              delete: props.actions?.delete,
              activate: props.actions?.activate,
              email: props.actions?.email,
              custom: props.actions?.custom,
              responsible: props.actions?.responsible,
              accept: props.actions?.accept,
              ship: props.actions?.ship,
            }}
            callback={{
              edit: editRowCallback,
              delete: deleteRowCallback,
            }}
          />
        )}
      </table>
    </Fragment>
  )
}
