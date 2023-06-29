/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Store/store";
import { setSideBarState } from "../../feature/SideBarSlice.slice";
import { useAuth } from "../../Contexts/AuthContext.context";
import { BiExit } from "react-icons/bi";
export function NavBar() {
  const { logOut } = useAuth();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.SideBar.isOpen);
  const handleSideBarStatus = () => {
    dispatch(setSideBarState(!isOpen));
  };
  return (
    <div className="navbar bg-dark-900">
      <div className="flex-none">
        <button
          className="btn-ghost btn-square btn"
          onClick={handleSideBarStatus}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current text-white">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 ">
        <a className="btn-ghost btn text-xl normal-case text-white">
          Inventory Control
        </a>
      </div>
      <div className="flex-none content-center items-center">
        
        <button className="btn-error btn-sm btn font-bold" onClick={logOut}><BiExit/>Salir</button>
      </div>
    </div>
  );
}
