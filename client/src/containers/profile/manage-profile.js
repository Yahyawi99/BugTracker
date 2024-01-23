import React, { useState, useEffect } from "react";
import { useMainContext } from "../../context/global";
// hooks
import useUsers from "../../hooks/useUsers";
// Components
import HomeBtn from "../../components/shared/HomeBtn";
// css
import "../../styles/containers/profile/manage-profile.css";

const ManageProfile = () => {
  const { alertMe, settingsNavigateTo, setSettingsNavigateTo } =
    useMainContext();
  const { getCurrentUser, currentUser, updateCurrentUser } = useUsers();

  const [userData, setUserData] = useState({
    ...currentUser,
    newEmail: "",
    currentPassword: "",
    newPassword: "",
    newPasswordConfirmed: "",
    image: "",
  });

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    setUserData(currentUser);
  }, [currentUser]);

  // Profile form handler
  const profileFormHandler = async (e) => {
    e.preventDefault();
    if (!userData.name) {
      await alertMe("Username can't be an empty string", "var(--danger)");
      return;
    }
    const formData = new FormData();
    const { name, phoneNumber, image } = userData;

    formData.append("data", JSON.stringify({ name, phoneNumber }));
    formData.append("file", image);

    updateCurrentUser(userData._id, formData);
  };

  // Email form handler
  const emailFormHandler = async (e) => {
    if (!userData.newEmail) {
      e.preventDefault();

      await alertMe("Email can't be an empty string", "var(--danger)");
      return;
    }
    const formData = new FormData();
    const { newEmail } = userData;

    formData.append("data", JSON.stringify({ newEmail }));

    updateCurrentUser(userData._id, formData);
  };

  // password form handler
  const passwordFormHandler = async (e) => {
    e.preventDefault();

    if (
      !userData.currentPassword ||
      !userData.newPassword ||
      !userData.newPasswordConfirmed
    ) {
      await alertMe("Please provide all values!", "var(--danger)");
      return;
    }

    if (userData.newPassword !== userData.newPasswordConfirmed) {
      await alertMe(
        "Please provide the same value for new password",
        "var(--danger)"
      );
      return;
    }

    const formData = new FormData();
    const { currentPassword, newPassword, newPasswordConfirmed } = userData;

    formData.append(
      "data",
      JSON.stringify({
        currentPassword,
        newPassword,
        newPasswordConfirmed,
      })
    );

    updateCurrentUser(userData._id, formData);
  };

  return (
    currentUser && (
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
                    className={`${settingsNavigateTo === value && "clicked"}`}
                    onClick={() => setSettingsNavigateTo(value)}
                  >
                    {value}
                  </li>
                );
              })}
            </ul>

            <div>
              <h3>{settingsNavigateTo}</h3>

              {settingsNavigateTo === "Profile" && (
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
                      value={userData.name || ""}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          name: e.currentTarget.value,
                        })
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

                      <label htmlFor="image" className="custom-button">
                        Choose File
                      </label>

                      <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            image: e.currentTarget.files[0],
                          })
                        }
                      />

                      <span className="file-name">
                        {userData.image
                          ? userData.image.name
                          : " No file chosen"}
                      </span>
                    </div>

                    <div className="currentImageController">
                      <p className="label">Current Image</p>

                      <img src={userData.avatar} alt="member" />
                    </div>
                  </div>

                  <button type="submit" className="Btn">
                    Save
                  </button>
                </form>
              )}

              {settingsNavigateTo === "Email" && (
                <form
                  className="form email-form"
                  onSubmit={(e) => emailFormHandler(e)}
                >
                  <div>
                    <label htmlFor="readonlyInput" className="label">
                      Email
                    </label>
                    <input
                      id="readonlyInput"
                      type="text"
                      value={userData.email || ""}
                      readOnly
                    />
                  </div>

                  <div>
                    <label htmlFor="newEmail" className="label">
                      New Email
                    </label>
                    <input
                      id="newEmail"
                      type="email"
                      value={userData.newEmail}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          newEmail: e.currentTarget.value,
                        })
                      }
                    />
                  </div>

                  <button type="submit" className="Btn">
                    Change email
                  </button>
                </form>
              )}

              {settingsNavigateTo === "Password" && (
                <form
                  className="form password-form"
                  onSubmit={(e) => passwordFormHandler(e)}
                >
                  <div>
                    <label htmlFor="currentPass" className="label">
                      Current password
                    </label>
                    <input
                      type="password"
                      id="currentPass"
                      value={userData.currentPassword}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          currentPassword: e.currentTarget.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="newPass" className="label">
                      New password
                    </label>
                    <input
                      type="password"
                      id="newPass"
                      value={userData.newPassword}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          newPassword: e.currentTarget.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmNewPass" className="label">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      id="confirmNewPass"
                      value={userData.newPasswordConfirmed}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          newPasswordConfirmed: e.currentTarget.value,
                        })
                      }
                    />
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
    )
  );
};

export default ManageProfile;
