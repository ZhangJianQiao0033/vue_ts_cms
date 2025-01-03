import hyRequest from "..";
import type { IAccount } from "@/types";
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: "/login",
    data: account
  })
}


export function getUserInfoRequest(id: number) {
  return hyRequest.get({
    url: `/users/${id}`,

  })
}


export function getMenuInfoRequest(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`,

  })
}
