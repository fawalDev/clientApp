import type Res from '../../models/response';
import type IAuthRes from '../../models/interfaces/response/fulfill/authenRes';

import { useState } from 'react';

import Input from '../../components/UI/Input';
import { useStore } from 'zustand';

import { loginAction } from './loginAction';
import authenStore from '../../store/authenStore';
import { setJWT, setUserInfor } from '../../ultilities/jwtToken';
import useTwoWayBinding from '../../hooks/useTwoWayBinding';
import ErrorMsg from '../../components/UI/ErrorMsg';
import useValidate from '../../hooks/useValidate';
import { isNotNull } from '../../ultilities/inputValidation/validate';
import { useNavigate } from 'react-router';




export default function LoginForm() {
  const [email, onchangeEmail] = useTwoWayBinding('')
  const [password, onchangePassword] = useTwoWayBinding('')

  // validate
  const emailErrorMsg = useValidate('Email', email, [isNotNull])
  const passwordErrorMsg = useValidate('Password', password, [isNotNull])


  const setAuthenInfor = useStore(authenStore, (state) => state.setAuthenInfor);


  const [isSubmited, setIsSubmited] = useState(false)
  const navigate = useNavigate()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmited(true)

    // prevent submit if any validation errors
    if (emailErrorMsg || passwordErrorMsg)
      return

    loginAction(email, password)
      .then((data: Res<IAuthRes>) => {
        // dispatch state action in zustand store
        setAuthenInfor(data.infor?.userInfor!);
        // store JWT in localStorage
        setJWT(data.infor?.jwtToken || '');
        setUserInfor(data.infor?.userInfor!)
        navigate('/'); // redirect to home page after login
      });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-purple-300 p-6 rounded w-full max-w-md mx-auto mt-10">
      <Input isRed
        label="YOUR E-MAIL"
        name="email"
        value={email}
        onChange={onchangeEmail}>
        {isSubmited && emailErrorMsg && < ErrorMsg msg={emailErrorMsg} />}
      </Input>

      <Input isRed
        label="PASSWORD"
        type="password"
        name="password"
        value={password}
        onChange={onchangePassword}>
        {isSubmited && passwordErrorMsg && < ErrorMsg msg={passwordErrorMsg} />}
      </Input>

      <button
        type="submit"
        className="bg-purple-900 text-white px-4 py-1 rounded hover:bg-purple-800"
      >
        LOGIN
      </button>
    </form>
  );
}
