import React, { useState } from 'react';
import { useSubmit } from 'react-router';

import Input from '../../components/UI/Input';
import useTwoWayBinding from '../../hooks/useTwoWayBinding';
import useValidate from '../../hooks/useValidate';
import { isNotNull } from '../../ultilities/inputValidation/validate';
import ErrorMsg from '../../components/UI/ErrorMsg';



export default function SignupForm() {
  const [email, onchangeEmail] = useTwoWayBinding('')
  const [name, onchangeName] = useTwoWayBinding('')
  const [password, onchangePassword] = useTwoWayBinding('')

  // validate
  const emailErrorMsg = useValidate('Email', email, [isNotNull])
  const nameErrorMsg = useValidate('Email', name, [isNotNull])
  const passwordErrorMsg = useValidate('Password', password, [isNotNull])


  const [isSubmited, setIsSubmited] = useState(false)
  const submit = useSubmit()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmited(true)

    // prevent submit if any validation errors
    if (emailErrorMsg || nameErrorMsg || passwordErrorMsg)
      return

    submit({ email, name, password }, {
      method: 'post', encType: 'application/json'
    })
  };

  return (
    <form onSubmit={handleSubmit} className="border border-purple-300 p-6 rounded w-full max-w-md mx-auto mt-10">

      <Input
        label="YOUR E-MAIL"
        name="email"
        value={email}
        onChange={onchangeEmail}>
        {isSubmited && emailErrorMsg && < ErrorMsg msg={emailErrorMsg} />}
      </Input>

      <Input
        label="YOUR NAME"
        name="name"
        value={name}
        onChange={onchangeName}>
        {isSubmited && nameErrorMsg && < ErrorMsg msg={nameErrorMsg} />}
      </Input>

      <Input
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
        SIGNUP
      </button>
    </form>
  );
}
