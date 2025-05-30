import type { ActionFunctionArgs } from "react-router";
import ErrorRes from "../../models/errorResponse";
import { getJWT } from "../jwtToken";


/**
 * MUST USE useSubmit() with encType:'application/json'
 *  exp: 
 * const submit = useSubmit();
 * submit({ target }, {
      method: 'post', encType:'application/json'
    })
 */

export async function postJson<T extends object>(args: ActionFunctionArgs, url: string, includeToken?: 'includeToken' | 'noneToken', actionInDone?: (jsonRes: T) => any, actionInFailed?: (jsonRes: ErrorRes<T>) => any)
    : Promise<T | ErrorRes<T> | undefined> {
    try {
        const data = await args.request.json()
        let headersInit: Record<string, any> = {}
        if (includeToken === 'includeToken')
            headersInit['authorization'] = getJWT() || ''

        headersInit = {
            ...headersInit,
            // 'content-type': 'application/json',
            ...Object.fromEntries(args.request.headers.entries())
        }

        const res = await fetch(url, {
            method: args.request.method,
            headers: headersInit,
            body: JSON.stringify(data)
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
