import type { IRes } from "../interfaces/response";

export default class Res<T extends object = object> implements IRes {
    constructor(
        public message: string,
        public status?: number,
        public data?: T
    ) { }
}