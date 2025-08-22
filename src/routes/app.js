import { lazy } from "react"
import { s } from "components/lib"

const MainPage = lazy(() => import("views/home"))
const Users = lazy(() => import("views/users"))
const Trash = lazy(() => import("views/users/trash"))

const Storages = lazy(() => import("views/storages"))
const Reports = lazy(() => import("views/reports"))
const Products = lazy(() => import("views/products"))
const Orders = lazy(() => import("views/orders"))
const Clients = lazy(() => import("views/clients"))
const Cargos = lazy(() => import("views/cargos"))
const AcceptGoods = lazy(() => import("views/accept-goods"))
const History = lazy(() => import("views/history"))
const Ship = lazy(() => import("views/ship"))
const Statuses = lazy(() => import("views/statuses"))
const Archive = lazy(() => import("views/archive"))
const Warehouses = lazy(() => import("views/warehouses"))

const Routes = [
  {
    path: "/",
    view: s(MainPage),
    layout: "app",
    title: "Главная",
  },
  {
    path: "/users",
    view: s(Users),
    layout: "app",
    title: "Пользователи",
  },
  {
    path: "/trash",
    view: s(Trash),
    layout: "app",
    title: "Корзина",
  },
  {
    path: "/storages",
    view: s(Storages),
    layout: "app",
    title: "Склады",
  },
  {
    path: "/products",
    view: s(Products),
    layout: "app",
    title: "Товары",
  },
  {
    path: "/reports",
    view: s(Reports),
    layout: "app",
    title: "Отчеты",
  },
  {
    path: "/orders",
    view: s(Orders),
    layout: "app",
    title: "Заказы",
  },
  {
    path: "/clients",
    view: s(Clients),
    layout: "app",
    title: "Клиенты",
  },
  {
    path: "/cargos",
    view: s(Cargos),
    layout: "app",
    title: "Карго",
  },
  {
    path: "/accept-goods",
    view: s(AcceptGoods),
    layout: "app",
    title: "Принять товары",
  },
  {
    path: "/history",
    view: s(History),
    layout: "app",
    title: "История",
  },
  {
    path: "/ship",
    view: s(Ship),
    layout: "app",
    title: "Выдача товара",
  },
  {
    path: "/statuses",
    view: s(Statuses),
    layout: "app",
    title: "Статусы",
  },
  {
    path: "/archive",
    view: s(Archive),
    layout: "app",
    title: "Архив",
  },
  {
    path: "/warehouses",
    view: s(Warehouses),
    layout: "app",
    title: "Склады",
  },
]

export default Routes
