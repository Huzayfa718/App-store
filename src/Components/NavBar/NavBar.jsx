import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';
import Swal from 'sweetalert2';

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Logged out successfully',
              timer: 1500,
              showConfirmButton: false,
            });
            navigate('/login');
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'Logout Failed',
              text: 'An error occurred during logout.',
            });
          });
      }
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          <img src="/logo.png" alt="Logo" className="w-[30px] h-[30px]" />
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Apps</Link></li>
          <li><Link to="/profile">MyProfile</Link></li>
        </ul>
      </div>

      <div className="navbar-end gap-4">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="User Avatar"
                src={user?.photoURL || 'https://placeimg.com/192/192/people'}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li><Link to="/profile">Profile <span className="badge">New</span></Link></li>
            <li><button onClick={handleSignout}>Logout</button></li>
          </ul>
        </div>

        {user ? (
          <button onClick={handleSignout} className="btn btn-neutral bg-red-700 text-white">Logout</button>
        ) : (
          <Link to="/login" className="btn btn-neutral bg-green-700 text-white">Login</Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
