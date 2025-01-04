import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/main/**/*.ts',
    {
      eager: true
    }
  )
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}
export let firstMenu: any = null
export function mapMenuToRoute(menuInfo: any) {
  const localRoutes = loadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of menuInfo) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)

      if (route) {
        routes.push(route)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
      }

      if (!firstMenu && route) {
        firstMenu = subMenu
      }
    }
  }
  return routes
}

export function mapPathToMenu(path: string, menuInfo: any[]) {
  for (const menu of menuInfo) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        return subMenu
      }
    }
  }
}
interface IBreadcrumbs {
  path: string
  name: string
}
export function mapPathToBreadcrumbs(path: string, menuInfo: any[]) {
  const breadcrumbs: IBreadcrumbs[] = []
  for (const menu of menuInfo) {
    for (const subMenu of menu.children) {
      if (path === subMenu.url) {
        const menuBread = { path: menu.url, name: menu.name }
        const subMenuBread = { path: subMenu.url, name: subMenu.name }
        breadcrumbs.push(menuBread)
        breadcrumbs.push(subMenuBread)
      }
    }
  }
  return breadcrumbs
}
