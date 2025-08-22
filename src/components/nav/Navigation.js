import React from "react"
import { useNavigate } from "react-router-dom"

export function Navigation({ menu }) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center  gap-3 justify-center p-2 bg-white shadow-lg lg:shadow-none">
      {menu?.map((m) => (
        <div
          className="p-2 cursor-pointer hover:bg-slate-200 rounded-md"
          onClick={() => navigate(`${m.link}`)}
        >
          {m.label}
        </div>
      ))}
    </div>
  )
}
