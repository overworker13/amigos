/***
 *
 *   BUTTON
 *   Can be a standard button, icon button or with loading animation
 *
 *   PROPS
 *   text: button label
 *   action: callback function executed on click
 *   goto: navigate
 *   color: red/blue (default: blue)
 *   icon: icon image (optional)
 *   iconSize: icon size
 *   className: pass a custom class object
 *
 **********/

import { Icon, ClassHelper } from "components/lib"

import ButtonStyle from "./button.tailwind.js"
import { useNavigate } from "react-router-dom"

export function IconButton(props) {
  const navigate = useNavigate()

  let buttonStyle =
    ClassHelper(ButtonStyle, {
      ...props,
      ...{
        [props.color]: props.color,
        primary: !props.color || props.color === "primary",
      },
    }) +
    " " +
    props.className

  if (props.normal) {
    buttonStyle += " text-sm py-0 block h-7"
  }

  return (
    <button
      disabled={props.disabled ?? false}
      className={buttonStyle}
      title={props.title}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()

        props.action && props.action(e)
        props.goto && navigate(props.goto)
      }}
    >
      {props.icon && (
        <Icon
          color="white"
          image={props.icon}
          pack={props.iconPack}
          size={props.iconSize || props.size || 16}
          className={props.iconStyle}
        />
      )}

      {props.text && <span>{props.text}</span>}
    </button>
  )
}
