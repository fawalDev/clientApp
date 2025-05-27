import { createStore, type StoreApi } from "zustand";

export type AuthenInfor = { name: string, email: string, isAdmin: boolean, isLogin?: boolean }
type AuthenStore = {
    authenInfor: AuthenInfor,
    setAuthenInfor: (authenInfor: AuthenInfor) => void,
    logout: () => void

}

const initialState: AuthenInfor = {
    name: '',
    email: '',
    isAdmin: false,
    isLogin: false
}

const authenStore: StoreApi<AuthenStore> = createStore(set => ({
    authenInfor: initialState,
    setAuthenInfor: (authenInfor: AuthenInfor) => set(() => ({ authenInfor: { ...authenInfor, isLogin: true }, })),
    logout: () => set(() => ({
        authenInfor: initialState
    }))
}))

export default authenStore