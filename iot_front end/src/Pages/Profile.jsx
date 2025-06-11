import NavbarMain from '../Components/NavbarMain';
import Footer from '../Components/Footer';
import Subfooter from '../Components/Subfooter';

const Profile = () => {
  return (
    <div>
      <NavbarMain />

      <div className="bg-lime-200 p-2 d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="bg-white shadow-lg rounded-4 p-5" style={{ width: '450px' }}>
          <h2 className="text-center mb-4 fw-bold">Profile</h2>

          <img
            src="/profile-icon.jpg"
            alt="Profile Icon"
            className="mx-auto d-block rounded-circle shadow mb-4"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />

          <h5 className="text-center text-secondary mb-3">Personal Information</h5>

          <div className="px-3">
            <p>
              <span className="fw-bold">Name:</span> BK GreenHouse
            </p>
            <p>
              <span className="fw-bold">Email:</span> greenhouse@gmail.com
            </p>
          </div>

          <div className="text-center mt-4">
            <a className="btn btn-danger px-4" href="/MainPage">
              Back
            </a>
          </div>
        </div>
      </div>

      <Footer />
      <Subfooter />
    </div>
  );
};

export default Profile;
