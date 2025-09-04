import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Logo from "../assets/logo.svg";
import "../blocks/RegisterModal.css";
import ModalWithForm from "../components/ModalWithForm";

function RegisterModal({ isOpen, handleCloseClick, onRegisterModalSubmit }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  // for user data when user registers new account
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const resetData = () => {
    setData({ name: "", email: "", password: "", avatar: "" });
  };
  useEffect(() => {}, [isOpen]); // watch the opening state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const { name, avatar, email, password } = data;
    console.log(`handleSubmit password: ${password}`);
    e.preventDefault();
    onRegisterModalSubmit({ name, avatar, email, password });
    resetData();
  };

  return (
    <ModalWithForm
      title="Sign up"
      submitBtnText="Next"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <div className="modal__label-container ">
        <label className="modal__label" htmlFor="email">
          Email*
        </label>
        <input
          placeholder="Email"
          className="modal__input"
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
      </div>
      <div className="modal__label-container ">
        <label className="modal__label" htmlFor="password">
          Password*
        </label>
        <input
          placeholder="Password"
          className="modal__input"
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
      </div>
      <div className="modal__label-container ">
        <label className="modal__label" htmlFor="name">
          Name
        </label>
        <input
          placeholder="Name"
          className="modal__input"
          id="name"
          name="name"
          type="text"
          value={data.name}
          onChange={handleChange}
        />
      </div>
      <div className="modal__label-container ">
        <label className="modal__label" htmlFor="avatar">
          Avatar URL
        </label>
        <input
          placeholder="Avatar URL"
          className="modal__input"
          id="avatar"
          name="avatar"
          type="url"
          value={data.avatar}
          onChange={handleChange}
        />
      </div>
      <div className="register__signin">
        <p>or</p>
        <Link to="login" className="register__login-link">
          Log in
        </Link>
      </div>
    </ModalWithForm>
  );
}
export default RegisterModal;
