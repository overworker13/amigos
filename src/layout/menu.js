export function getMenu(role) {
  let menu = [
    {
      label: "Пользователи",
      link: "/users",
      icon: "users",
      role: 3,
    },
    {
      label: "Карго",
      link: "/cargos",
      icon: "database",
      role: 3,
    },
    {
      label: "Статусы",
      link: "/statuses",
      icon: "truck",
      role: 3,
    },
    // {
    //   label: "Склады",
    //   link: "/storages",
    //   icon: "database",
    //   role: 3,
    // },
    {
      label: "Заказы",
      link: "/products",
      icon: "shopping-cart",
      role: 3,
    },
    // {
    //   label: "Отчеты",
    //   link: "/reports",
    //   icon: "bar-chart-2",
    //   role: 3,
    // },

    {
      label: "Клиенты",
      link: "/clients",
      icon: "users",
      role: 2,
    },
    // {
    //   label: "Склады",
    //   link: "/warehouses",
    //   icon: "database",
    //   role: 2,
    // },
    {
      label: "Заказы",
      link: "/products",
      icon: "shopping-bag",
      role: 2,
    },
    // {
    //   label: "Принять товары",
    //   link: "/accept-goods",
    //   icon: "box",
    //   role: 2,
    // },
    // {
    //   label: "Статусы",
    //   link: "/statuses",
    //   icon: "truck",
    //   role: 2,
    // },
    // {
    //   label: "История",
    //   link: "/history",
    //   icon: "monitor",
    //   role: 2,
    // },
    // {
    //   label: "Выдать товар клиенту",
    //   link: "/ship",
    //   icon: "truck",
    //   role: 2,
    // },

    // {
    //   label: "Клиенты",
    //   link: "/clients",
    //   icon: "users",
    //   role: 1,
    // },
    // {
    //   label: "Склады",
    //   link: "/warehouses",
    //   icon: "database",
    //   role: 1,
    // },
    {
      label: "Заказы",
      link: "/products",
      icon: "shopping-bag",
      role: 1,
    },
    // {
    //   label: "Принять товары",
    //   link: "/accept-goods",
    //   icon: "box",
    //   role: 1,
    // },

    // {
    //   label: "История",
    //   link: "/history",
    //   icon: "monitor",
    //   role: 1,
    // },
    // {
    //   label: "Выдать товар клиенту",
    //   link: "/ship",
    //   icon: "truck",
    //   role: 1,
    // },

    {
      label: "Добавить",
      link: "add-order",
      icon: "truck",
      bg: "bg-green-300",
      role: 0,
    },

    {
      label: "Информация",
      link: "information",
      icon: "info",
      bg: "bg-orange-300",
      role: 0,
    },
    // {
    //   label: "Пользователи",
    //   link: "/users",
    //   icon: "users",
    //   role: 4,
    // },
    // {
    //   label: "Статусы",
    //   link: "/statuses",
    //   icon: "truck",
    //   role: 4,
    // },
    {
      label: "Заказы",
      link: "/products",
      icon: "shopping-bag",
      role: 4,
    },

    // {
    //   label: "Архив",
    //   link: "/archive",
    //   icon: "archive",
    //   bg: "bg-red-300",
    //   role: 0,
    // },
  ]

  menu = menu.filter((item) => item.role === role)

  return menu
}
