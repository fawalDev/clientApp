import { useState } from 'react';

import Input from '../../components/UI/Input';

import useTwoWayBinding from '../../hooks/useTwoWayBinding';
import ErrorMsg from '../../components/UI/ErrorMsg';
import useValidate from '../../hooks/useValidate';
import { isNotNull } from '../../ultilities/inputValidation/validate';
import { useActionData, useSubmit } from 'react-router';
import type ErrorRes from '../../models/errorResponse';
import type IAuthError from '../../interfaces/response/error/authError';




export default function LoginForm() {
  const [email, onchangeEmail] = useTwoWayBinding('')
  const [password, onchangePassword] = useTwoWayBinding('')

  // client validate
  const emailErrorMsg = useValidate('Email', email, [isNotNull])
  const passwordErrorMsg = useValidate('Password', password, [isNotNull])

  // server validate
  const actionData = useActionData<ErrorRes<IAuthError>>()



  const [isSubmited, setIsSubmited] = useState(false)
  const submit = useSubmit()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmited(true)

    // prevent submit if any validation errors
    if (emailErrorMsg || passwordErrorMsg)
      return

    submit({ email, password }, {
      method: 'post', encType:'application/json'
    })
    
  };

  return (
    
    <form onSubmit={handleSubmit} className="border border-purple-300 p-6 rounded w-full max-w-md mx-auto mt-10">
      <Input className='w-full border p-2 rounded outline-none border-red-300 bg-red-100'
        label="YOUR E-MAIL"
        name="email"
        value={email}
        onChange={onchangeEmail}
        autoFocus
      >
        {isSubmited && emailErrorMsg && < ErrorMsg msg={emailErrorMsg} />}
      </Input>

      <Input className='w-full border p-2 rounded outline-none border-red-300 bg-red-100'
        label="PASSWORD"
        type="password"
        name="password"
        value={password}
        onChange={onchangePassword}>
        {isSubmited && passwordErrorMsg && < ErrorMsg msg={passwordErrorMsg} />}
      </Input>

      {actionData?.cause?.credential
        && <ErrorMsg msg={actionData.cause.credential} />
      }

      <button
        type="submit"
        className="bg-purple-900 text-white px-4 py-1 rounded hover:bg-purple-800">
        LOGIN
      </button>
    </form>
  );
}
