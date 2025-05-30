import type { ActionFunctionArgs } from "react-router";
import ErrorRes from "../../models/errorResponse";
import { getJWT } from "../jwtToken";


/**
 * use with <Form> or submit default - encType:'multipart/form-data'
 */

export async function postFormData<T extends object>(args: ActionFunctionArgs, url: string, includeToken?: 'includeToken' | 'noneToken', actionInDone?: (jsonRes: T) => any, actionInFailed?: (jsonRes: ErrorRes<T>) => any)
    : Promise<T | ErrorRes<T> | undefined> {
    try {
        const formData = await args.request.formData()
        let headersInit: Record<string, any> = {}
        if (includeToken === 'includeToken')
            headersInit['authorization'] = getJWT() || ''

        headersInit = {
            ...headersInit,
            // 'content-type': 'multipart/form-data',
            ...args.request.headers
        }

        const res = await fetch(url, {
            method: args.request.method,
            headers: headersInit,
            body: formData,
        });
        const json = await res.json()
        if (res.ok)
            return actionInDone ? actionInDone(json) : json as T;

        return actionInFailed ? actionInFailed(json) : json as ErrorRes<T>;
    } catch (error) {
        alert(error);
        console.error(error)

    }
}
