/***
 *
 *   MODAL
 *   Display an overlay modal anywhere in your application by calling
 *   context.modal.show() with an object containing the following props
 *
 *   PROPS
 *   title: (optional)
 *   text: message to the user (optional)
 *   form: a form object (optional: see form docs for more information)
 *   url: destination to send the form
 *   method: HTTP post type
 *   buttonText – text for the confirm button
 *
 **********/

import { useContext } from "react"
import { Card } from "components/lib"
import { CSSTransition } from "react-transition-group"
import "./modal.scss"
import { ViewContext } from "contexts/view"

export function Modal(props) {
  const context = useContext(ViewContext)

  const hide = () => {
    context.modal.hide(true)
  }

  return (
    <CSSTransition in appear timeout={0} classNames="modal">
      <div
        className={"modal overflow-y-auto " + props.className}
        onClick={(e) => e.target === e.currentTarget && hide()}
      >
        <div className="modal-content">
          <Card className="rounded p-8">
            {props.title && (
              <h1 className="mb-8 font-medium text-xl text-black">
                {props.title}
              </h1>
            )}
            {props.text && <p className="mb-12">{props.text}</p>}

            {props.children}
          </Card>
        </div>
      </div>
    </CSSTransition>
  )
}
