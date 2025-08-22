/***
 *
 *   PAGINATE
 *   Pagination control to split results into multple pages
 *   Returns a new offset
 *
 *   PROPS
 *   total: the total number of results
 *   limit: the number of results per page
 *   offset: the current position
 *
 **********/

import { useState, useEffect, Fragment } from "react"
import { IconButton, ClassHelper } from "components/lib"
import Style from "./paginate.tailwind.js"

export function Paginate(props) {
  const totalPages = Math.ceil(props.total / props.limit)
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (props.total) setTotal(props.total)
  }, [props.total])

  useEffect(() => {
    const currentPage = Math.ceil((props.offset + 1) / props.limit)
    setPage(currentPage - 1)
  }, [props.offset])

  function prev() {
    if (page > 0) {
      setPage(page - 1)
      props.onChange((page - 1) * props.limit)
    }
  }

  function next() {
    if (page < totalPages - 1) {
      setPage(page + 1)
      props.onChange((page + 1) * props.limit)
    }
  }

  const start = parseInt(props.offset + 1) // add one so it doesn't start at 0
  const end = parseInt(props.offset) + parseInt(props.limit)

  const paginateStyle = ClassHelper(Style, {
    paginate: true,
    className: props.className,
  })

  return (
    <section className={paginateStyle}>
      {!props.complex && (
        <Fragment>
          <IconButton
            icon="chevron-left"
            size={20}
            color="transparent"
            className={Style.button}
            iconColor={page > 0 || props.loading ? "purple" : "grey"}
            action={prev}
          />

          <span className={Style.counter}>
            {props.offset || props.limit
              ? `записи с ${start} - ${end > total ? total : end} по ${total} `
              : "Нет записей"}
          </span>

          <IconButton
            icon="chevron-right"
            size={20}
            color="transparent"
            className={Style.button}
            iconColor={
              page < totalPages - 1 || props.loading ? "purple" : "grey"
            }
            action={next}
          />
        </Fragment>
      )}

      {props.complex && <Fragment></Fragment>}
    </section>
  )
}
