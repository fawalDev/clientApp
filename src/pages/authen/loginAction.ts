import type IAuthRes from "../../interfaces/response/fulfill/authenRes";

import { redirect, type ActionFunctionArgs } from "react-router";

import ServerUrl from "../../ultilities/serverUrl";
import { postJson } from "../../ultilities/fetcher/postJson";
import authenStore from "../../store/authenStore";
import { setJWT, setUserInfor } from "../../ultilities/jwtToken";
import ErrorRes from "../../models/errorResponse";
import Res from "../../models/response";

export async function loginAction(args: ActionFunctionArgs) {
  const setAuthenInfor = authenStore.getState().setAuthenInfor

  const postRes = await postJson<IAuthRes>(args, ServerUrl.login)
  if (postRes && !postRes.ok && postRes instanceof ErrorRes)
    return postRes

  else if (postRes instanceof Res) {
    const authRes = postRes?.data;
    // dispatch state action in zustand store
    setAuthenInfor(authRes?.userInfor!);
    // store JWT in localStorage
    setJWT(authRes?.jwtToken || '');
    setUserInfor(authRes?.userInfor!)
    return redirect('/');
  }
}
