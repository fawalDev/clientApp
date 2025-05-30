import { getJWT } from "../jwtToken";


export default async function getDefer<T>(url: string, includeToken?: 'includeToken' | 'noneToken'): Promise<T | null> {

    try {
        const headersInit: Record<string, any> = {}
        if (includeToken === 'includeToken')
            headersInit['authorization'] = getJWT() || ''

        const response = await fetch(url, {
            headers: headersInit
        }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const defer: Promise<T> = response.json()
        return defer
    } catch (error) {
        console.error(error)
        return Promise.resolve(null)
    }
}