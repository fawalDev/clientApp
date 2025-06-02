import type IPost from "../post";
import type IO from "./io";



export default interface IPostIO extends IO {
    action: "create" | "delete" | "update"
    post: IPost
}