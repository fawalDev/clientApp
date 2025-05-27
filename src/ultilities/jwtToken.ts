import type { AuthenInfor } from "../store/authenStore";

export function getJWT() {
    return localStorage.getItem('jwt');
}

export function setJWT(token: string) {
    localStorage.setItem('jwt', token);
}

export function setUserInfor(userInfor: AuthenInfor) {
    localStorage.setItem('userInfor', JSON.stringify(userInfor));
}

export function removeJWT() {
    localStorage.removeItem('jwt');
}