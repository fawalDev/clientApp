import type { IRes } from "../interfaces/response";



export default class ErrorRes<T extends object = Record<string, any>> extends Error implements IRes {
    ok = false
    constructor(
        message: string,
        public status?: number,
        public cause?: T
    ) {
        super(message)
    }
}