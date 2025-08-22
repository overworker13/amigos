const ButtonStyle = {
  base: "cursor-pointer font-sans text-sm rounded flex items-center gap-2 px-5 ease-in-out duration-500 transition",
  outline:
    "text-slate-500 border-solid border border-slate-200 hover:text-white hover:border-slate-500 hover:bg-slate-500 bg-transparent",
  green: "bg-emerald-500 hover:bg-emerald-600 !text-white",
  red: "bg-red-500 hover:bg-red-600 hover:border-red-500  text-white",
  transparent: "bg-transparent",
  primary: "bg-indigo-500 hover:bg-indigo-600 hover:border-blue-600 text-white",
  orange: "bg-orange-500 hover:bg-orange-600 hover:border-orange-600",
  blue: "text-white bg-indigo-500 hover:bg-indigo-600 hover:border-blue-600 text-white",
  grey: "bg-gray-100 hover:bg-gray-200 hover:border-gray-200 text-gray-400 font-medium",
  black:
    "bg-black hover:bg-gray-800 hover:border-gray-800 text-white font-medium",
  smoke: "text-white bg-gray-400 hover:bg-gray-500 hover:border-gray-500",
  loading: `relative after:absolute after:w-4 after:h-4 after:right-1 after:top-4 after:z-10`,
}

export default ButtonStyle
