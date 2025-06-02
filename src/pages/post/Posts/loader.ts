import type IPost from "../../../interfaces/post";
import getDefer from "../../../ultilities/fetcher/getDefer";
import ServerUrl from "../../../ultilities/serverUrl";


export type postLoader = {
    postListDefer: Promise<IPost[] | null>
}

export function loader(): postLoader {
    return {
        postListDefer: getDefer<IPost[]>(ServerUrl.post, 'includeToken')
    }
}