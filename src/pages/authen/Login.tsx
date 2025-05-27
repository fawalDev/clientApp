import { useState } from 'react';
import Input from '../../components/Input';
import { loginAction } from './loginAction';
import { useStore } from 'zustand';
import authenStore from '../../store/authenStore';
import { setJWT, setUserInfor } from '../../ultilities/jwtToken';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const setAuthenInfor = useStore(authenStore, (state) => state.setAuthenInfor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginAction(formData.email, formData.password)
      .then((data) => {
        // dispatch state action in zustand store
        setAuthenInfor(data.user);
        // store JWT in localStorage
        setJWT(data.token);
        setUserInfor(data.user);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-purple-300 p-6 rounded w-full max-w-md mx-auto mt-10">
      <Input isRed
        label="YOUR E-MAIL"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input isRed
        label="PASSWORD"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-purple-900 text-white px-4 py-1 rounded hover:bg-purple-800"
      >
        LOGIN
      </button>
    </form>
  );
}
