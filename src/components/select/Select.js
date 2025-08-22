import React from "react"

export function Select(props) {
  return (
    <form className={props.className ? props.className : `max-w-lg`}>
      {props.label && (
        <label
          htmlFor="countries"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
        >
          {props.label}
        </label>
      )}

      <select
        onChange={(e) =>
          props.onChange && props.onChange(e.target.value ?? "unselected")
        }
        value={props.default || ""}
        id={props.id}
        className="bg-white rounded-md w-full border-2 text-gray-700 text-sm lg:text-base px-2 py-2  outline-none hover:bg-blue-100"
      >
        <option value="" disabled>
          {props.placeholder}
        </option>
        {props.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  )
}
