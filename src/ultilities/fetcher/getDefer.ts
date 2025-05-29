import { getJWT } from "../jwtToken";


export default async function getDefer<T>(url: string, includeToken?: 'includeToken'): Promise<T | null> {
    const headerInit: HeadersInit = {
        'authorization': includeToken ? getJWT() || '' : ''
    }
    try {
        const response = await fetch(url, {
            headers: headerInit
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