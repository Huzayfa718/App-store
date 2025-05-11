import React, { useContext, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../../Contexts/AuthContext';
import { auth } from '../../Firebase.init';
import Swal from 'sweetalert2';

export default function MyInfo() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleUpdate = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
      Swal.fire({
        icon: 'success',
        title: 'Profile updated successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to update profile.',
        text: error.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Info</h1>

      <div className="card w-96 bg-base-100 shadow-xl mb-6">
        <div className="card-body items-center text-center">
          <img
            className="w-24 h-24 rounded-full mb-4"
            src={user?.photoURL || 'https://placeimg.com/192/192/people'}
            alt="User Avatar"
          />
          <h2 className="card-title">{user?.displayName}</h2>
          <p>{user?.email}</p>
          <p>{user?.phoneNumber || 'No phone number'}</p>
        </div>
      </div>

      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Update Info</h2>
        <input
          type="text"
          className="input input-bordered w-full mb-3"
          placeholder="New Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          className="input input-bordered w-full mb-3"
          placeholder="New Photo URL"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
        />
        <button className="btn btn-primary w-full" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
}
