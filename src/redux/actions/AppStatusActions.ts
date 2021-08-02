const REFRESH_APP_STATUS = "REFRESH_APP_STATUS";

export type AppStatus = {
  status: string,
  date: string
}

const refreshAppStatusAction = (stauts: AppStatus) => {
  return {
    type: REFRESH_APP_STATUS,
    stauts: stauts
  }
}

export {
  REFRESH_APP_STATUS,
  refreshAppStatusAction
}