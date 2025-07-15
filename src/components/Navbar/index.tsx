import useStore from '../../store';
import AuthNavbar from './AuthNavbar';
import PublicNavbar from './PublicNavbar';


export default function Navbar() {
  const { isAuthenticated } = useStore();

  return isAuthenticated ? <AuthNavbar /> : <PublicNavbar />;
}
