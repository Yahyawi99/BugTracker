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

            <form>
              <div className="nameController">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" />
              </div>

              <div className="phoneController">
                <label htmlFor="phone">Phone number</label>
                <input type="tel" id="phone" />
              </div>

              <div>
                <div className="imageController">
                  <label htmlFor="image">Image</label>
                  <input type="file" id="image" />
                </div>

                <div className="currentImageController">
                  <label htmlFor="currentImage">Current Image</label>
                  <img src="j" alt="member" id="currentImage" />
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
