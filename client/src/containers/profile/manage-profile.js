import React from "react";
// Components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/profile/manage-profile.css";

const ManageProfile = () => {
  return (
    <section className="manageProfile">
      <HomeBtn name="Profile" />

      <div>
        <div className="titles">
          <h1>Manage your account</h1>
          <h2>Change your account settings</h2>
        </div>

        <div>
          <ul className="navigation">
            <li className="clicked">Profile</li>
            <li>Email</li>
            <li>Password</li>
          </ul>

          <div>
            <h3>Profile</h3>

            <form className="profile-form">
              <div className="nameController">
                <label className="label" htmlFor="username">
                  Username
                </label>
                <input type="text" id="username" />
              </div>

              <div className="phoneController">
                <label className="label" htmlFor="phone">
                  Phone number
                </label>
                <input type="tel" id="phone" />
              </div>

              <div className="imageContainer">
                <div className="imageController">
                  <p className="label">Image</p>

                  <input type="file" id="image" />

                  <label htmlFor="image" class="custom-button">
                    Choose File
                  </label>

                  <span className="file-name">No file chosen</span>
                </div>

                <div className="currentImageController">
                  <label className="label" htmlFor="currentImage">
                    Current Image
                  </label>

                  <img
                    src="/assets/images/default-avatar-1.jpg"
                    alt="member"
                    id="currentImage"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProfile;
