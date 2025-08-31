import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Logo from "../assets/logo.svg";
import "../blocks/LoginModal.css";
import ModalWithForm from "../components/ModalWithForm";

const LoginModal = ({ isOpen, handleCloseClick, onLoginModalSubmit }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {}, [isOpen]); // watch the opening state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit(e);
  };
  return (
    <ModalWithForm
      title="Log in"
      submitBtnText="Log in"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
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

      <div className="login__signup">
        <p>or</p>
        <Link to="/register" className="signup__link">
          Register
        </Link>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
