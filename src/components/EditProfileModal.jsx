import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import Logo from "../assets/logo.svg";
import "../blocks/LoginModal.css";
import ModalWithForm from "../components/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  handleCloseClick,
  onEditProfileModalSubmit,
}) => {
  const [data, setData] = useState({
    name: "",
    avatar: "",
  });

  const resetData = () => {
    setData({ name: "", avatar: "" });
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
    e.preventDefault();
    onEditProfileModalSubmit(data);
    resetData();
  };
  return (
    <ModalWithForm
      title="Change profile data"
      submitBtnText="Save Changes"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
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
    </ModalWithForm>
  );
};

export default EditProfileModal;
