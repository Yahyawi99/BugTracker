import React, { useState, useEffect } from "react";
import { useMainContext } from "../../context/global";
// hooks
import useUsers from "../../hooks/useUsers";
// Components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/profile/manage-profile.css";

const ManageProfile = () => {
  const { alertMe } = useMainContext();
  const { getCurrentUser, currentUser, updateCurrentUser } = useUsers();

  const [navigateTo, setNavigateTo] = useState("Profile");
  const [userData, setUserData] = useState({ ...currentUser });

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    setUserData(currentUser);
  }, [currentUser]);

  // profile form handler
  const profileFormHandler = async (e) => {
    e.preventDefault();
    if (!userData.name) {
      await alertMe("Username can't be an empty string", "var(--danger)");
      return;
    }

    const { name, phoneNumber } = userData;
    console.log(name);
    updateCurrentUser(userData._id, { name, phoneNumber });
  };

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
            {["Profile", "Email", "Password"].map((value, i) => {
              return (
                <li
                  key={i}
                  className={`${navigateTo === value && "clicked"}`}
                  onClick={() => setNavigateTo(value)}
                >
                  {value}
                </li>
              );
            })}
          </ul>

          <div>
            <h3>{navigateTo}</h3>

            {navigateTo === "Profile" && (
              <form
                className="form profile-form"
                onSubmit={(e) => profileFormHandler(e)}
              >
                <div className="nameController">
                  <label className="label" htmlFor="username">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.currentTarget.value })
                    }
                  />
                </div>

                <div className="phoneController">
                  <label className="label" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={userData.phoneNumber ? userData.phoneNumber : ""}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        phoneNumber: e.currentTarget.value,
                      })
                    }
                  />
                </div>

                <div className="imageContainer">
                  <div className="imageController">
                    <p className="label">Image</p>

                    <input type="file" id="image" />

                    <label htmlFor="image" className="custom-button">
                      Choose File
                    </label>

                    <span className="file-name">No file chosen</span>
                  </div>

                  <div className="currentImageController">
                    <label className="label" htmlFor="currentImage">
                      Current Image
                    </label>

                    <img src={userData.avatar} alt="member" id="currentImage" />
                  </div>
                </div>

                <button type="submit" className="Btn">
                  Save
                </button>
              </form>
            )}

            {navigateTo === "Email" && (
              <form className="form email-form">
                <div>
                  <label htmlFor="readonlyInput" className="label">
                    Email
                  </label>
                  <input
                    id="readonlyInput"
                    type="text"
                    value={userData.email}
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
              </form>
            )}

            {navigateTo === "Password" && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProfile;
