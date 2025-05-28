export default async function getDefer<T>(url: string): Promise<T | null> {
    try {
        const response = await fetch(url);

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