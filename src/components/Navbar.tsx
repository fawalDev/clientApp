import { NavLink } from "react-router";

export default function Navbar() {
  return (
    <header className="bg-purple-900 text-white flex justify-between items-center px-4 py-2">
      <div className="font-bold border border-white px-2 py-1">MessageNode</div>
      <div className="space-x-4 text-sm">
        <NavLink to='/login' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>Login</NavLink>
        <NavLink to='/signup' className={({ isActive }) => `${isActive ? 'text-orange-400' : 'text-purple-200'}  hover:text-orange-400`}>Signup</NavLink>
      </div>
    </header>
  );
}
