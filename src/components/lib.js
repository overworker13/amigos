import { Suspense, memo } from "react"
export { Navigation } from "./nav/Navigation"
export { Icon } from "./icon/Icon"
export { Container } from "./container/Container"
export { Select } from "./select/Select"
export { Button } from "./button/Button"
export { Modal } from "./modal/modal"
export { Card } from "./card/card"
export { ClassHelper } from "./helpers/class"
export { Loader } from "./loader/loader"
export { Animate } from "./animate/Animate"
export { RangeDatePicker } from "./rangedatepicker/RangeDatePicker"
export { ColoredSelect } from "./coloredselect/coloredselect"
export { Back } from "./back/Back"
export { IconButton } from "./iconbutton/IconButton"
export { Paginate } from "./paginate/paginate"
export { Table } from "./table/table"
export { Search } from './search/search'

export const s = (Component) => {
  const WrappedComponent = memo((props) => (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          Загрузка...
        </div>
      }
    >
      <Component {...props} />
    </Suspense>
  ))
  WrappedComponent.displayName = `withSuspense(${
    Component.displayName || Component.name
  })`
  return WrappedComponent
}
