import { redirect, type ActionFunctionArgs } from "react-router";
import { postFormData } from "../../../ultilities/fetcher/postFormData";
import ServerUrl from "../../../ultilities/serverUrl";
import modalStore from "../../../components/modal/store";

export async function postFormAction(args: ActionFunctionArgs) {
    const hideModal = modalStore.getState().hide
    const actionInDone = () => {
        hideModal()
        return redirect('/')
    }

    return await postFormData(args, ServerUrl.post, 'includeToken', actionInDone)
}