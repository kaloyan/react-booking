import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import styles from "./Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";

import Modal from "../../ui/Modal";
import { createBlobImage, extractImageName } from "../../../utils/helpers";
import { uploadAvatar, delAvatar } from "../../../services/firebaseSrv";
import { useRequest } from "../../../hooks/useRequest";
import { pushMessage } from "../../../features/slices/localSlice";
import { useValidator } from "../hooks/useValidator";
import { profileSchema } from "../../../schemas/index";

export default function Profile() {
  const handle = "account";
  const user = useRequest("user", handle);
  const data = useSelector((state) => state.responses[handle]);

  useEffect(() => {
    user.get();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [userId, setUserId] = useState("");
  const [avatar, setAvatar] = useState("");
  // const [avatar, setAvatar] = useState("");
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

    validationSchema: profileSchema,

    onSubmit: async (values) => {
      let image = avatar;

      if (avatar !== newAvatar) {
        if (values.avatar !== "") {
          try {
            const avatarHandle = extractImageName(values.avatar);
            await delAvatar(avatarHandle);
          } catch (err) {
            dispatch(pushMessage({ text: err, type: "error" }));
          }
        }

        image = await uploadAvatar(newAvatar);
      }

      formik.values.avatar = image;
      updateProfile();
    },
  });

  const { getError, getClass } = useValidator(formik);

  useEffect(() => {
    if (data) {
      formik.setValues({
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: data.address,
        gender: data.gender,
        birthday: data.birthday,
        newPass: "",
        rePass: "",
        avatar: "",
      });

      setUserId(data.id);
      setAvatar(data.avatar);
      setNewAvatar(data.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const updateProfile = async () => {
    const content = {
      username: formik.values.username,
      email: formik.values.email,
      phone: formik.values.phone,
      address: formik.values.address,
      avatar: formik.values.avatar,
      birthday: formik.values.birthday,
      gender: formik.values.gender,
    };

    if (formik.values.newPass !== "") {
      content.password = formik.values.newPass;
    }

    try {
      user.update(userId, content).then((response) => {
        if (response) {
          dispatch(
            pushMessage({
              text: "Your account is updated successfully",
              type: "success",
            })
          );
          navigate("../profile");
        }
      });
    } catch (err) {
      dispatch(pushMessage({ text: err, type: "error" }));
    }
  };

  const handleDeleteAccount = (e) => {
    setModal(`Are you shure you want to delete account ${formik.values.email}`);
  };

  const acceptHandler = () => {
    const msg = "Your account will be deleted in 7 days!";
    dispatch(pushMessage({ text: msg, type: "info" }));
    setModal(null);
    navigate("../profile");
  };

  const handleChangeAvatar = (e) => {
    setNewAvatar(e.target.files[0]);

    const img = createBlobImage(e.target.files[0]);
    setAvatar(img);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {modal && (
        <Modal
          message={modal}
          closeHandler={() => setModal(null)}
          acceptHandler={acceptHandler}
        />
      )}

      <section className={styles["grid-container"]}>
        <div className={styles["header"]}>
          <div className={styles["bread-crump"]}>
            <FontAwesomeIcon icon={faUserEdit} />
            <h1>Edit Profile</h1>
          </div>

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
            <input
              type="file"
              className={styles["input-select-files"]}
              id="avatar"
              onChange={handleChangeAvatar}
            />
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
              onBlur={formik.handleBlur}
              className={getClass("username")}
            />
            {getError("username")}
          </div>

          <div className={styles["item"]}>
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getClass("email")}
            />
            {getError("email")}
          </div>

          <div className={styles["item"]}>
            <label htmlFor="phone">Phone number: </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getClass("phone")}
            />
            {getError("phone")}
          </div>

          <div className={styles["item"]}>
            <label htmlFor="address">Address: </label>
            <input
              type="address"
              id="address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getClass("address")}
            />
            {getError("address")}
          </div>

          <div className={styles["item"]}>
            <label htmlFor="gender">Gender: </label>
            <select
              name="gender"
              id="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getClass("gender")}
            >
              <option value="">-- Prefer not to say --</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {getError("gender")}
          </div>

          <div className={styles["item"]}>
            <label htmlFor="birthday">Birthday: </label>
            <input
              type="date"
              id="birthday"
              name="birthday"
              value={formik.values.birthday}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getClass("birthday")}
            />
            {getError("birthday")}
          </div>

          <hr />

          <h4>Change password</h4>

          <div></div>

          <div className={styles["item"]}>
            <label htmlFor="newpass">New password </label>
            <input
              type="password"
              id="newpass"
              name="newPass"
              minLength="3"
              value={formik.values.newPass}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={getClass("newPass")}
            />
            {getError("newPass")}
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
              onBlur={formik.handleBlur}
              className={getClass("rePass")}
            />
            {getError("rePass")}
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
