import { IconButton } from "components/lib"
import Style from "./table.tailwind.js"

export default function TableActions(props) {
  const row = props.row

  Style.actionButton =
    " !px-1 !py-1 cursor-pointer flex items-center justify-center"

  return (
    <td key={props.index} className={Style.actions}>
      {row.actions?.custom?.map((action, i) => {
        if (action.condition) {
          return row[action.condition.col] === action.condition.value ? (
            <IconButton
              key={i}
              icon={action.icon}
              action={() => action.action(row)}
              className={Style.actionButton}
            />
          ) : (
            false
          )
        }

        return (
          <IconButton
            key={i}
            icon={action.icon}
            action={() => action.action(row)}
            className={Style.actionButton}
          />
        )
      })}

      {row.actions.edit && (
        <IconButton
          icon="edit"
          color="green"
          size={14}
          action={() =>
            row.actions.edit(row, (res) => props.callback.edit(res, row))
          }
          className={Style.actionButton}
        />
      )}

      {row.actions.activate && (
        <IconButton
          icon="user-plus"
          color="green"
          size={14}
          action={() =>
            row.actions.activate(row, (res) =>
              props.callback.activate(res, row)
            )
          }
          className={Style.actionButton}
        />
      )}

      {row.actions.responsible && (
        <IconButton
          icon="user-check"
          color="green"
          size={14}
          action={() =>
            row.actions.responsible(row, (res) =>
              props.callback.responsible(res, row)
            )
          }
          className={Style.actionButton}
        />
      )}

      {row.actions.accept && (
        <IconButton
          icon="download"
          color="orange"
          size={14}
          action={() =>
            row.actions.accept(row, (res) => props.callback.accept(res, row))
          }
          className={Style.actionButton}
        />
      )}

      {row.actions.ship && (
        <IconButton
          icon="gift"
          color="green"
          size={14}
          action={() =>
            row.actions.ship(row, (res) => props.callback.ship(res, row))
          }
          className={Style.actionButton}
        />
      )}

      {row.actions.download && (
        <IconButton
          icon="download"
          url={row.actions.download}
          className={Style.actionButton}
        />
      )}

      {row.actions.view && (
        <IconButton
          icon="eye"
          url={`${row.actions.view.url}/${row[row.actions.view.col]}`}
          className={Style.actionButton}
        />
      )}

      {row.actions.email && (
        <IconButton
          icon="mail"
          action={() => (window.location = `mailto:${row.email}`)}
          className={Style.actionButton}
        />
      )}

      {row.actions.invite && (
        <IconButton
          icon="mail"
          action={(e) => row.actions.invite(row)}
          className={Style.actionButton}
        />
      )}

      {row.actions.delete && (
        <IconButton
          color="red"
          icon="trash"
          action={() =>
            row.actions.delete(row, (res) => props.callback.delete(res, row))
          }
          className={Style.actionButton}
          iconColor="red"
        />
      )}
    </td>
  )
}
