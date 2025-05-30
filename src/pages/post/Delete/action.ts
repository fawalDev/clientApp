import type { ActionFunctionArgs } from "react-router";
import { postJson } from "../../../ultilities/fetcher/postJson";
import ServerUrl from "../../../ultilities/serverUrl";

export async function deleteAction(args: ActionFunctionArgs) {
    const id = args.params['id']
    const url = ServerUrl.post + '/' + id

    const actionInDone = () => {
        return null
    }

    return postJson(args, url, 'includeToken', actionInDone)
}