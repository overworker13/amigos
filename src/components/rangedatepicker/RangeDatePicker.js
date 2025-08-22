import { useEffect, useState } from "react"
import { DateRangePicker } from "react-dates"
import "react-dates/initialize"
import "react-dates/lib/css/_datepicker.css"
import "./react-dates.css"
import moment from "moment"
import "moment/locale/en-gb"
import "moment/locale/ru"
moment.locale("ru")

export function RangeDatePicker(props) {
  const locale = "ru"
  const [startDate, setStartDate] = useState(props.startDate)
  const [endDate, setEndDate] = useState(props.endDate)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const onDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate)
    setEndDate(endDate)
    props.onChange(startDate, endDate)
  }

  useEffect(() => {
    console.log(moment(props.startDate))
    setStartDate(props.startDate ? moment(props.startDate) : null)
    setEndDate(props.endDate ? moment(props.endDate) : null)
  }, [props.startDate, props.endDate])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={props.className}>
      <DateRangePicker
        startDatePlaceholderText="от"
        endDatePlaceholderText="до"
        showClearDates={true}
        startDate={startDate}
        endDate={endDate}
        onDatesChange={onDatesChange}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        startDateId="start-date"
        endDateId="end-date"
        displayFormat="DD.MM.YYYY"
        numberOfMonths={1}
        anchorDirection="left"
        orientation="horizontal"
        small
        isOutsideRange={() => false}
        locale={locale}
      />
    </div>
  )
}
