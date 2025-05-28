import ServerUrl from "../../ultilities/serverUrl";

export async function signupAction(email: string, name: string, password: string) {
    try {
        const response = await fetch(ServerUrl.signup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, name, password })
        });
        if (!response.ok) {
            throw new Error('Signup failed');
        }
        return await response.json();
    } catch (error) {
        alert(error);
    }
}
