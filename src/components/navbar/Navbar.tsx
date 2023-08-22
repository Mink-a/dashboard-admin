import "./navbar.scss";
import {
  MagnifyingGlassIcon,
  TokensIcon,
  CornersIcon,
  BellIcon,
  GearIcon,
} from "@radix-ui/react-icons";

function Navbar() {
  return (
    <div className='navbar'>
      <div className='logo'>
        <img src='logo.svg' alt='' />
        <span>Admin Dashboard</span>
      </div>
      <div className='icons'>
        <MagnifyingGlassIcon className='icon' />
        <TokensIcon className='icon' />
        <CornersIcon className='icon' />
        <GearIcon className='icon' />
        <div className='notification'>
          <BellIcon className='icon' />
          <span>1</span>
        </div>
        <div className='user'>
          <img
            src='https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load'
            alt='user picture'
          />
          <span>Jane</span>
        </div>
        <img src='/settings.svg' alt='' className='icon' />
      </div>
    </div>
  );
}

export default Navbar;
