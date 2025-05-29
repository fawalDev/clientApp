import type { ActionFunctionArgs } from "react-router";
import ErrorRes from "../../models/errorResponse";


/**
 * MUST USE useSubmit() with encType:'application/json'
 *  exp: 
 * const submit = useSubmit();
 * submit({ target }, {
      method: 'post', encType:'application/json'
    })
 */

export async function postJson<T extends object>(args: ActionFunctionArgs, url: string, actionInDone?: (jsonRes: T) => any, actionInFailed?: (jsonRes: ErrorRes<T>) => any)
    : Promise<T | ErrorRes<T> | undefined> {
    try {
        // const formData = Object.fromEntries((await args.request.formData()).entries())
        const data = await args.request.json()

        const res = await fetch(url, {
            method: args.request.method,
            headers: args.request.headers,
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
