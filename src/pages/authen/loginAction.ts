import type IAuthRes from "../../interfaces/response/fulfill/authenRes";

import { redirect, type ActionFunctionArgs } from "react-router";

import ServerUrl from "../../ultilities/serverUrl";
import { postJson } from "../../ultilities/fetcher/postJson";
import authenStore from "../../store/authenStore";
import { setJWT, setUserInfor } from "../../ultilities/jwtToken";



export async function loginAction(args: ActionFunctionArgs) {
  const setAuthenInfor = authenStore.getState().setAuthenInfor

  const actionInDone = (jsonRes: IAuthRes) => {
    // dispatch state action in zustand store
    setAuthenInfor(jsonRes?.userInfor!);
    // store JWT in localStorage
    setJWT(jsonRes?.jwtToken || '');
    setUserInfor(jsonRes?.userInfor!)
    return redirect('/');
  }

  return await postJson<IAuthRes>(args, ServerUrl.login, 'noneToken', actionInDone)

}
