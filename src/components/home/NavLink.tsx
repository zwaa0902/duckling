import { Link } from 'react-router-dom';

interface NavLinkProps {
  route: string;
  title: string;
}

function NavLink({ route, title }: NavLinkProps) {
  return (
    <nav>
      <Link to={route}>{title}</Link>
    </nav>
  );
}

export default NavLink;
