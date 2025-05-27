export async function loginAction(email: string, password: string) {
   try {
     const response = await fetch('/api/login', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({ email, password })
     });
     if (!response.ok) {
       throw new Error('Login failed');
     }
     const data = await response.json();
     return data;
   } catch (error) {
     alert(error);
   }
}
