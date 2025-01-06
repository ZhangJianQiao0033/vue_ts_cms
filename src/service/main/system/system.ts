import hyRequest from '@/service'

export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserData(id: number) {

  return hyRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {

  return hyRequest.post({
    url: `/users`,
    data: userInfo
  })
}

export function updateUserData(id: number, userInfo: any) {

  return hyRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}


export function postPageListData(path: string, queryInfo: any) {
  return hyRequest.post({
    url: `/${path}/list`,
    data: queryInfo
  })
}

export function deletePageData(path: string, id: number) {

  return hyRequest.delete({
    url: `/${path}/${id}`
  })
}

export function newPageData(path: string, userInfo: any) {

  return hyRequest.post({
    url: `/${path}`,
    data: userInfo
  })
}

export function updatePageData(path: string, id: number, userInfo: any) {

  return hyRequest.patch({
    url: `/${path}/${id}`,
    data: userInfo
  })
}

