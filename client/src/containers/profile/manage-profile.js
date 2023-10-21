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
            <h3>Password</h3>

            {/* <form className="form profile-form">
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
            </form> */}

            {/* <form className="form email-form">
              <div>
                <label htmlFor="oldEmail" className="label">
                  Email
                </label>
                <input
                  id="oldEmail readonlyInput"
                  type="text"
                  value="yassinyahyawi26@gmail.com"
                  readOnly
                />
              </div>

              <div>
                <label htmlFor="newEmail" className="label">
                  New Email
                </label>
                <input id="newEmail" type="email" />
              </div>

              <button className="Btn">Change email</button>
            </form> */}

            <form className="form password-form">
              <div>
                <label htmlFor="currentPass" className="label">
                  Current password
                </label>
                <input type="password" id="currentPass" />
              </div>

              <div>
                <label htmlFor="newPass" className="label">
                  New password
                </label>
                <input type="password" id="newPass" />
              </div>

              <div>
                <label htmlFor="confirmNewPass" className="label">
                  Confirm new password
                </label>
                <input type="password" id="confirmNewPass" />
              </div>

              <button type="submit" className="Btn">
                Update password
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProfile;
