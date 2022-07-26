import styles from "./Dashboard.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { uploadAvatar, delAvatar } from "../../../services/firebaseSrv";
import { getAccount, updateAccount } from "../../../services/netReq";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { pushMessage } from "../../../features/slices/localSlice";
import { createBlobImage, extractImageName } from "../../../utils/helpers";
import Modal from "../../ui/Modal";

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [modal, setModal] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      avatar: "",
      birthday: "",
      oldPass: "",
      newPass: "",
      rePass: "",
    },

    onSubmit: async (values) => {
      // console.log(values);

      if (
        formik.values.newPass !== "" &&
        formik.values.newPass !== formik.values.repPass
      ) {
        dispatch(
          pushMessage({
            text: "Passwords dont match",
            type: "error",
          })
        );
        return;
      }

      if (formik.values.avatar !== newAvatar) {
        if (formik.values.avatar !== "") {
          try {
            const avatarHandle = extractImageName(formik.values.avatar);
            await delAvatar(avatarHandle);
          } catch (err) {
            dispatch(
              pushMessage({
                text: err,
                type: "error",
              })
            );
          }
        }

        const image = await uploadAvatar(newAvatar);
        // console.log(image);
        formik.values.avatar = image;

        updateProfile();
      } else {
        updateProfile();
      }
    },
  });

  const updateProfile = async () => {
    const content = {
      username: formik.values.username,
      email: formik.values.email,
      phone: formik.values.phone,
      address: formik.values.address,
      gender: formik.values.gender,
      avatar: formik.values.avatar,
      birthday: formik.values.birthday,
      gender: formik.values.gender,
    };

    if (formik.values.newPass !== "") {
      content.password = formik.values.newPass;
    }

    try {
      const response = await updateAccount(userId, content);

      if (response?.status === "OK") {
        dispatch(
          pushMessage({
            text: response.message,
            type: "success",
          })
        );
      }

      navigate("../profile");
    } catch (err) {
      dispatch(
        pushMessage({
          text: err,
          type: "error",
        })
      );
    }
  };

  const handleDeleteAccount = (e) => {
    // console.log("delete account");
    setModal(`Are you shure you want to delete account ${formik.values.email}`);
  };

  const closeHandler = () => {
    setModal(null);
  };

  const acceptHandler = () => {
    console.log("account will be deleted!");
    setModal(null);
  };

  const handleChangeAvatar = (e) => {
    setNewAvatar(e.target.files[0]);

    const img = createBlobImage(e.target.files[0]);
    setAvatar(img);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAccount();

      formik.setValues({
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
        avatar: data.avatar,
        birthday: data.birthday,
        oldPass: "",
        newPass: "",
        rePass: "",
      });

      setUserId(data.id);
      setAvatar(data.avatar);
      setNewAvatar(data.avatar);
    };

    fetchData();
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      {modal && (
        <Modal
          message={modal}
          closeHandler={closeHandler}
          acceptHandler={acceptHandler}
        />
      )}

      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <h1>Edit Profile</h1>

          <div>
            <NavLink to={"../profile"} className={styles["action-btn"]}>
              <span>Cancel</span>
            </NavLink>
          </div>
        </div>

        <div className={styles["side"]}>
          <div>
            {avatar ? (
              <img src={avatar} alt="avatar" className={styles["avatar"]} />
            ) : (
              <FontAwesomeIcon icon={faUser} className={styles["avatar"]} />
            )}
          </div>
          <div>
            <label htmlFor="avatar" className={styles["file-upload"]}>
              Upload picture
            </label>
            <input type="file" id="avatar" onChange={handleChangeAvatar} />
          </div>
        </div>

        <div className={styles["content"]}>
          <div className={styles["item"]}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="phone">Phone number: </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="address">Address: </label>
            <input
              type="address"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="gender">Gender: </label>
            <select
              name="gender"
              id="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
            >
              <option value="">-- Prefer not to say --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles["item"]}>
            <label htmlFor="birthday">Birthday: </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
            />
          </div>

          <hr />

          <h4>Change password</h4>

          <div></div>

          {/* <div className={`${styles["item"]}`}>
            <label htmlFor="oldpass">Current password </label>
            <input
              type="password"
              id="oldpass"
              name="oldPass"
              value={formik.values.oldPass}
              onChange={formik.handleChange}
            />
          </div> */}

          {/* <div></div> */}

          <div className={styles["item"]}>
            <label htmlFor="newpass">New password </label>
            <input
              type="password"
              id="newpass"
              name="newPass"
              minLength="3"
              value={formik.values.newPass}
              onChange={formik.handleChange}
            />
          </div>

          <div className={styles["item"]}>
            <label htmlFor="repass">Repeat new password </label>
            <input
              type="password"
              id="repass"
              name="rePass"
              minLength="3"
              value={formik.values.rePass}
              onChange={formik.handleChange}
            />
          </div>

          <hr />

          <div className={styles["item"]}>
            <input type="submit" value="Save settings" />
          </div>

          <hr />

          <h4>Danger zone</h4>
          <div></div>
          <div className={styles["item"]}>
            <input
              type="button"
              className={styles["delete-btn"]}
              value="Delete account"
              onClick={handleDeleteAccount}
            />
          </div>

          <div className={styles["item"]}>
            <p className={styles["warning"]}>
              WARNING! * Account cannot be restored
            </p>
          </div>
        </div>
      </section>
    </form>
  );
}
