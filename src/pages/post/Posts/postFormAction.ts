import type { ActionFunctionArgs } from "react-router";
import { postFormData } from "../../../ultilities/fetcher/postFormData";
import ServerUrl from "../../../ultilities/serverUrl";
import modalStore from "../../../components/modal/store";
import type ErrorRes from "../../../models/errorResponse";

export async function postFormAction(args: ActionFunctionArgs) {
    const hideModal = modalStore.getState().hide
    const showModal = modalStore.getState().show
    const actionInDone = () => {
        hideModal()
    }

    const actionInFailed = (errorRes: ErrorRes) => {
        if (errorRes.status === 401)
            return showModal('error', errorRes)
        return errorRes
    }

    const actionInError = (jsonRes: Error) => {
        showModal('error', jsonRes)
    }

    return await postFormData(args, ServerUrl.post, 'includeToken', actionInDone, actionInFailed, actionInError)
}