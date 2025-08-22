const Style = {
  table: "w-full -mb-6 rounded",
  search: "mb-4",
  loading: "relative text-center animate-spin",
  badge: "ml-0",
  empty: "py-3 px-2",
  thead:
    "font-semibold md:table-header-group bg-gradient-to-r from-slate-300 to-slate-500 text-white whitespace-nowrap",
  th_actions: "text-center",
  body: "bg-white",
  th: "text-left outline-0 border-b  border-slate-200 text-sm px-2 py-1",
  sort: `relative cursor-pointer after:absolute after:right-0 after:top-1/2 after:-translate-y-1.5 after:mt-0
    after:w-3 after:h-3 after:opacity-50  after:bg-contain`,

  asc: `after:bg-bg-sort-asc`,
  desc: `after:bg-bg-sort-desc`,

  cell: `p-2 text-sm border border-dashed whitespace-nowrap`,

  actions: `p-2 flex gap-2 items-center justify-center border-b border-r border-dashed `,
}

export default Style
