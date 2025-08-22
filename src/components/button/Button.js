import { Icon } from "components/lib"
import React from "react"

export function Button(props) {
  const colors = {
    blue: "flex items-center gap-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 !py-1 text-center",

    green:
      "flex items-center gap-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1 text-center",

    teal: "flex items-center gap-2 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center",

    red: "flex items-center gap-2 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80  font-medium rounded-lg text-sm px-5 py-1 text-center",

    inst: "flex items-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium font-medium rounded-lg text-sm px-5 py-1 text-center",
  }
  return (
    <button
      type="button"
      className={colors[props.color || "blue"] + " " + props.className}
      onClick={(e) => props.onClick && props.onClick(e)}
    >
      {props.text}
      {props.icon && (
        <div className={`${props.iconLoading && "animate-spin"}`}>
          <Icon image={props.icon} color={props.iconColor} />
        </div>
      )}
    </button>
  )
}
