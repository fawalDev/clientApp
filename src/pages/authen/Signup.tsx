import React, { useState } from 'react';
import Input from '../../components/Input';
import { signupAction } from './signupAction';
import { useStore } from 'zustand';
import authenStore from '../../store/authenStore';
import { setJWT, setUserInfor } from '../../ultilities/jwtToken';

export default function SignupForm() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });

  const setAuthenInfor = useStore(authenStore, (state) => state.setAuthenInfor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signupAction(formData.email, formData.name, formData.password)
      .then((data) => {
        // dispatch state action in zustand store
        setAuthenInfor(data.user);
        // store JWT in localStorage
        setJWT(data.token);
        setUserInfor(data.user);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-purple-300 p-6 rounded w-full max-w-md mx-auto mt-10"
    >
      <Input
        label="YOUR E-MAIL"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="YOUR NAME"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <Input
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
        SIGNUP
      </button>
    </form>
  );
}
