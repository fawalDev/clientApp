import ServerUrl from "../../ultilities/serverUrl";

export async function loginAction(email: string, password: string) {
  try {
    const response = await fetch(ServerUrl.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) {
      throw await response.json();
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error);
  }
}
