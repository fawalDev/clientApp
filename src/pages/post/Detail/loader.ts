import type { LoaderFunctionArgs } from "react-router";
import type IPost from "../../../interfaces/post";
import getDefer from "../../../ultilities/fetcher/getDefer";
import ServerUrl from "../../../ultilities/serverUrl";

export type detailLoader = {
    post: Promise<IPost | null>
}

export function loader(args: LoaderFunctionArgs): detailLoader {
    return {
        post: getDefer<IPost>(ServerUrl.post + '/' + args.params['id'])
    }
}