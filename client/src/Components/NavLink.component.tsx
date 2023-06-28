import { NavLink } from "react-router-dom"
interface NavLinkProps {
    NavigateTo: string;
    Text: string;
    Icon: JSX.Element;
}
export function NavLinkComponent(props:NavLinkProps ) {
  return (
    <NavLink
      to={`${props.NavigateTo}`}
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "active"
          : "normal"
      }>
      <span className="mr-2">
        {props.Icon}
      </span> 
      {props.Text}
    </NavLink>
  );
}
