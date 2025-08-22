import Style from "./coloredselect.tailwind.js"
import { Fragment, useState } from "react"

export function ColoredSelect({
  options,
  selectedOption,
  onOptionSelect,
  placeholder,
  className,
  hidePlaceholder,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    onOptionSelect(option.value, option)
    toggleDropdown()
  }

  const selectedLabel =
    selectedOption !== null &&
    selectedOption !== undefined &&
    options.find((option) => option.value === selectedOption)?.label

  return (
    <Fragment>
      <div className={"relative " + className}>
        <div
          className="flex justify-between items-center px-3 py-1.5 border rounded-md cursor-pointer bg-neutral-800 text-white"
          onClick={toggleDropdown}
        >
          <span className="mr-2 text-xs">{selectedLabel || placeholder}</span>
          <span className="text-xs">{isOpen ? "▲" : "▼"}</span>
        </div>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 border rounded-md bg-white z-10 overflow-hidden">
            {!hidePlaceholder && (
              <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-xs"
                key={"notchosen"}
                onClick={() => handleOptionClick({ value: null })}
              >
                {placeholder}
              </div>
            )}

            {options.map((option) => (
              <div
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-xs"
                key={option.value}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </Fragment>
  )
}
