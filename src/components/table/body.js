import TableActions from "./actions"
import Style from "./table.tailwind.js"
import { useNavigate } from "react-router-dom"

export function Body(props) {
  if (props.data?.length) {
    return (
      <tbody className={Style.body}>
        {props.data.map((row, index) => {
          return (
            <Row
              {...props}
              data={row}
              key={index}
              onRightClick={props.onRightClick}
            />
          )
        })}
      </tbody>
    )
  }

  return (
    <tbody className={Style.body}>
      <tr>
        <td colSpan="10" className={Style.empty}>
          Нет данных
        </td>
      </tr>
    </tbody>
  )
}

export function Row(props) {
  const navigate = useNavigate()

  let row = { ...props.data }
  row.actions = row.actions || props.actions
  const hasActions = Object.values(row.actions).some((x) => x !== undefined)

  const navigateTo = (id) => {
    if (typeof props.onRowClick === "function") {
      props.onRowClick(row)
      return
    }

    if (!props.enableNavigate) return
    let url = props.dynamicUrl || ""
    navigate(url + "/" + id)
  }

  return (
    <tr
      data-id={props.data.id}
      onClick={() => navigateTo(props.data.id)}
      onContextMenu={(e) =>
        props.onRightClick ? props.onRightClick(e, props.data.id) : null
      }
      className={
        "cursor-pointer hover:bg-gray-50 " +
        (row.is_not_read ? " bg-sky-100 hover:bg-slate-100 font-bold" : "")
      }
    >
      {Object.keys(row).map((cell, index) => {
        // hide
        if (props.hide?.includes(cell)) return false

        // actions

        if (cell === "is_not_read") {
          return null
        }

        if (cell === "actions")
          return hasActions ? (
            <TableActions
              row={row}
              index={index}
              key={index}
              callback={props.callback}
            />
          ) : (
            false
          )

        if (row[cell] === null) {
          return <td key={index} className={Style.cell}></td>
        }

        if (typeof row[cell] === "object") {
          // TODO: make autoload

          const Elements = {}

          let Element = Elements[row[cell].Element] ?? "div"

          return (
            <td key={index} className={Style.cell}>
              <Element {...row[cell].data} />
            </td>
          )
        }

        // show
        if (props.show && !props.show.includes(cell)) return false

        let value = row[cell]

        // is date/time
        // if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(value)){

        //   value = DateFormat(value, 'd.m.Y');

        // }

        // has badge
        if (value !== undefined && props.badge && cell === props.badge.col) {
          // default color
          let color = props.badge.color

          // check each condition
          if (props.badge.condition) {
            props.badge.condition.forEach((cond) => {
              typeof cond.value === "string" && typeof value === "string"
                ? (color =
                    cond.value.toLowerCase() === value.toLowerCase()
                      ? cond.color
                      : color)
                : (color = cond.value === value ? cond.color : color)
            })
          }

          return <td key={index} className={Style.cell}></td>
        }

        // standard cell
        return (
          <td key={index} className={Style.cell}>
            {value === true ? "Yes" : value === false ? "No" : value}
          </td>
        )
      })}
    </tr>
  )
}
