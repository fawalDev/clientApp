import type { ActionFunctionArgs } from "react-router";
import Res from "../../models/response";
import ErrorRes from "../../models/errorResponse";


export async function postJson<T extends object>(args: ActionFunctionArgs, url: string): Promise<Res<T> | ErrorRes<T> | undefined> {
    try {
        const formData = Object.fromEntries((await args.request.formData()).entries())
        // console.log(args.request.body)
        const res = await fetch(url, {
            method: args.request.method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        const data = await res.json()
        if (!res.ok) 
            return new ErrorRes<T>(data?.message, res.status, data?.cause);
        

        return new Res<T>(data?.message, res.status, data);
    } catch (error) {
        alert(error);
        console.error(error)
        
    }
}
