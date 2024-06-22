import User from './User';
import DarkModeSwitcher from './DarkModeSwitcher';
import Logo from '../../images/logo/Barbie_Logo.png';
import { Link } from 'react-router-dom';

const Header = ({
}) => {
  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
        </div>

        <Link to="/">
          <img src={Logo} alt="logo" className='h-12' />
        </Link>
        

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
            </div>
          </form>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <User />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
