import { Modal } from "components/lib"
import Toaster from "components/toaster/Toaster"
import { AppLayout } from "layout/app"
import { AuthLayout } from "layout/auth"
import { createContext, useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// auth context
export const ViewContext = createContext()

export function View(props) {
  const [modal, setModal] = useState({})

  const showNotification = (message, type) => {
    return toast[type](`${message}`)
  }

  function showModal(content, callback) {
    let data = { ...modal }

    if (content) {
      for (let key in content) data[key] = content[key]

      data.show = true
      data.callback = callback
    }

    setModal(data)
  }

  function hideModal(cancel, res) {
    // callback?
    if (!cancel && modal.callback) modal.callback(modal.form, res)

    // reset the modal
    setModal({
      title: null,
      text: null,
      buttonText: null,
      url: null,
      method: null,
      show: false,
    })
  }

  const data = {
    notification: {
      show: showNotification,
    },
    modal: {
      show: showModal,
      hide: hideModal,
      data: modal,
    },
  }
  // layouts
  const layouts = {
    app: AppLayout,
    auth: AuthLayout,
  }

  //web page title
  document.title = props.title

  let Layout = props.layout ? layouts[props.layout] : AppLayout

  if (!props.display) return false

  return (
    <ViewContext.Provider value={{ ...data }}>
      <Toaster />

      {modal.show && <Modal {...modal} />}

      <Layout title={props.title} data={props.data}>
        {props.display}
      </Layout>
    </ViewContext.Provider>
  )
}
