import { NavLink } from "react-router";
import { useStore } from "zustand";
import authenStore from "../store/authenStore";

export default function Navbar() {
  const isLogin = useStore(authenStore, (state) => state.authenInfor.isLogin)
  const userName = useStore(authenStore, (state) => state.authenInfor.name);
  const email = useStore(authenStore, (state) => state.authenInfor.email);
  return (
    <header className="bg-purple-900 text-white flex justify-between items-center px-4 py-2">
      <div className="font-bold border border-white px-2 py-1">
        <NavLink to='/' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>
          MessageNode
        </NavLink>
      </div>
      {!isLogin &&
        <div className="space-x-4 text-sm">
          <NavLink to='/login' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>Login</NavLink>
          <NavLink to='/signup' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>Signup</NavLink>
        </div>
      }
      {isLogin &&
        <div className="space-x-4 text-sm">
          <NavLink to='/' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>{userName || email}</NavLink>
          <NavLink to='/logout' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>Logout</NavLink>
        </div>
      }

    </header>
  );
}
