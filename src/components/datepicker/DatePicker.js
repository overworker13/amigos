import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange, DateRangePicker } from "react-date-range"
import React, { useState } from "react"
import { ru } from "date-fns/locale"

const predefinedRanges = [
  { label: "Сегодня", value: [new Date(), new Date()] },
  {
    label: "Вчера",
    value: [
      new Date(new Date().setDate(new Date().getDate() - 1)),
      new Date(new Date().setDate(new Date().getDate() - 1)),
    ],
  },
  {
    label: "Эта неделя",
    value: [
      new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay() + 1)
      ),
      new Date(),
    ],
  },
  {
    label: "Прошлая неделя",
    value: [
      new Date(
        new Date().setDate(new Date().getDate() - new Date().getDay() - 6)
      ),
      new Date(new Date().setDate(new Date().getDate() - new Date().getDay())),
    ],
  },
  {
    label: "Этот месяц",
    value: [
      new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      new Date(),
    ],
  },
  {
    label: "Прошлый месяц",
    value: [
      new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    ],
  },
]

export function DatePicker(props) {
  const [selectedRange, setSelectedRange] = useState(predefinedRanges[0].value)

  return (
    <div className="flex w-full">
      <div className="flex flex-col p-4">
        {predefinedRanges.map((range, index) => (
          <div
            key={index}
            className={`p-2 cursor-pointer text-sm ${
              selectedRange === range.value
                ? "text-blue-500 font-semibold"
                : "text-gray-700"
            }`}
            onClick={() => {
              setSelectedRange(range.value)
              props.onChange &&
                props.onChange({
                  selection: {
                    startDate: range.value[0],
                    endDate: range.value[1],
                  },
                })
            }}
          >
            {range.label}
          </div>
        ))}
      </div>
      <DateRange
        locale={ru}
        editableDateInputs={true}
        moveRangeOnFirstSelection={true}
        showDateDisplay={false}
        months={1}
        direction="horizontal"
        ranges={[props.default]}
        onChange={(ranges) => props.onChange && props.onChange(ranges)}
      />
    </div>
  )
}
