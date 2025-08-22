import React from "react"

export function AuthLayout(props) {
  return (
    <main className={"flex flex-col bg-gray-100 min-h-screen"}>
      {<props.children {...props.data} />}
    </main>
  )
}
