import { Button } from "components/lib"
import { AuthContext } from "contexts/auth"
import { ViewContext } from "contexts/view"
import React, { useContext } from "react"

export function CargoInformationModal() {
  const { user } = useContext(AuthContext)

  const view = useContext(ViewContext)

  const handleCopy = (text) => {
    if (!navigator.clipboard) {
      // Use fallback method for unsupported browsers
      fallbackCopyTextToClipboard(text)
      return
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        view.notification.show("Текст скопирован!", "success")
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        fallbackCopyTextToClipboard(text)
      })
  }

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea")
    textArea.value = text

    // Avoid scrolling to bottom
    textArea.style.top = "0"
    textArea.style.left = "0"
    textArea.style.position = "fixed"

    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      const msg = successful
        ? "Текст скопирован!"
        : "Не удалось скопировать текст"
      view.notification.show(msg, successful ? "success" : "error")
    } catch (err) {
      console.error("Fallback: Unable to copy", err)
      view.notification.show("Не удалось скопировать текст", "error")
    }

    document.body.removeChild(textArea)
  }

  const guangzhouAddress = `广东省佛山市南海区里水镇洲村三横路水松基工业园区4号735库房转Y阿斯哈特 SHYM ${user.name} ${user.surname} ${user.code} ${user.phone} 收货人：阿斯哈特13653099999`
  const yiwuAddress = `浙江省金华市义乌市稠城街道大塘下二区17栋6单元735库房转俄通Y阿斯哈特 SHYM ${user.name} ${user.surname} ${user.code} ${user.phone} 收货人：阿斯哈特 电话：18845699676`

  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex flex-col gap-2 items-center">
        <span className="text-center text-xs font-semibold">
          Склад Гуанчжоу
        </span>
        <div className="grid text-xs border p-4 bg-green-200">
          <span>
            广东省佛山市南海区里水镇洲村三横路水松基工业园区4号735库房转Y阿斯哈特
            <b>
              SHYM {user.name} {user.surname} {user.code}{" "}
              {user.phone}
            </b>
          </span>
          <span>收货人：阿斯哈特13653099999</span>
          <button
            className="mt-2 p-1 bg-blue-500 text-white text-xs rounded"
            onClick={() => handleCopy(guangzhouAddress)}
          >
            Скопировать
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <span className="text-center text-xs font-semibold">Склад ИУ</span>
        <div className="grid text-xs border p-4 bg-orange-200">
          <span>
            浙江省金华市义乌市稠城街道大塘下二区17栋6单元735库房转俄通Y阿斯哈特
            <b>
              SHYM {user.name} {user.surname} {user.code}{" "}
              {user.phone}
            </b>
          </span>
          <div className="grid">
            <span>收货人：阿斯哈特</span>
            <span>电话：18845699676</span>
          </div>
          <button
            className="mt-2 p-1 bg-blue-500 text-white text-xs rounded"
            onClick={() => handleCopy(yiwuAddress)}
          >
            Скопировать
          </button>
        </div>
      </div>

      <Button
        text="Закрыть"
        color="red"
        icon="x"
        className="ml-auto"
        onClick={() => view.modal.hide()}
      />
    </div>
  )
}
