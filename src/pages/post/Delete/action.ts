import type { ActionFunctionArgs } from "react-router";
import ServerUrl from "../../../ultilities/serverUrl";
import { postFormData } from "../../../ultilities/fetcher/postFormData";
import type ErrorRes from "../../../models/errorResponse";
import modalStore from "../../../components/modal/store";



export async function deleteAction(args: ActionFunctionArgs) {
    const id = args.params['id']
    const deleteUrl = ServerUrl.post + '/' + id

    const showModal = modalStore.getState().show
    const setType = modalStore.getState().setType
    const setResponse = modalStore.getState().setResponse

    const actionInDone = () => {
        setType('inform')
        setResponse({ message: 'Delete post successfully' })
        showModal()
    }

    const actionInFailed = (jsonRes: ErrorRes) => {
        setType('error')
        setResponse(jsonRes)
        showModal()
    }

    return postFormData(args, deleteUrl, 'includeToken', actionInDone, actionInFailed)
}