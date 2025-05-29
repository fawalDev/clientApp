import type IPost from "../../../interfaces/post";
import getDefer from "../../../ultilities/fetcher/getDefer";
import ServerUrl from "../../../ultilities/serverUrl";


export type postLoader = {
    postList: Promise<IPost[] | null>
}

export function loader(): postLoader {
    return {
        postList: getDefer<IPost[]>(ServerUrl.post, 'includeToken')
    }
}