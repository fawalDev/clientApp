import type { AuthenInfor } from "../../../store/authenStore"

export default interface IAuthRes {
    jwtToken?: string              // JWT token
    userInfor?: AuthenInfor
}