import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Logo from "../assets/logo.svg";
import "../blocks/LoginModal.css";
import ModalWithForm from "../components/ModalWithForm";
import "../blocks/LoginModal.css";

const LoginModal = ({
  isOpen,
  handleCloseClick,
  onLoginModalSubmit,
  onRegisterClick,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const resetData = () => {
    setData({ email: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit(data);
    resetData();
  };
  return (
    <ModalWithForm
      title="Log in"
      submitBtnText="Log in"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      onClick={onRegisterClick}
    >
      <div className="modal__label-container ">
        <label className="modal__label" htmlFor="email">
          Email
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
          Password
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
    </ModalWithForm>
  );
};

export default LoginModal;
