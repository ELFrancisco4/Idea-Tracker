import Logo from "../Shared Components/Logo";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./nav.scss";
import { IoMdAddCircleOutline } from "react-icons/io";
import * as yup from "yup";
import { useFormik, FormikValues } from "formik";
import Modal from "react-modal";
import Form from "../Shared Components/Form";
import InputField from "../Shared Components/InputField";
import { toast } from "react-toastify";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { setIsLoggedIn } = useContext(AuthContext);

  const validationSchema = yup.object({
    title: yup.string().required(),
    category: yup.string().required(),
    body: yup.string().max(500, "Not more than 500 characters").required(),
  });

  const addNewNote = async (values: FormikValues) => {
    const res = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/notes`,
      values,
      {
        withCredentials: true,
      }
    );
    if (res) {
     toast.success("Note has been added")
    } else {
      toast.error("Something went wrong, please try again")
    }
    setIsOpen(false);
  };

  const formik = useFormik({
    initialValues: { title: "", category: "", body: "" },
    validateOnBlur: true,
    onSubmit: addNewNote,
    validationSchema: validationSchema,
  });

  const logOut = async () => {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/logout`);
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav>
      <Logo />
      <span className="add_note" onClick={() => setIsOpen(true)}>
        <IoMdAddCircleOutline />
      </span>
      <span className="logout" onClick={logOut}>
        Logout
      </span>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="create_note_modal"
      >
        <Form onSubmit={formik.handleSubmit}>
          <h1>Document your ideas</h1>

          <div>
            <h3>Title</h3>
            {formik.touched.title && formik.errors.title ? (
              <span className="errors">{formik.errors.title}</span>
            ) : (
              ""
            )}
            <InputField
              classname="title"
              id="title"
              type="text"
              placeholder="Note Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>

          <div>
            <h3>Category</h3>
            <InputField
              classname="category"
              id="category"
              type="text"
              placeholder="Note Category"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category ? (
              <span className="errors">{formik.errors.category}</span>
            ) : (
              ""
            )}
          </div>

          <div>
            <h3>Body</h3>
            {formik.touched.body && formik.errors.body ? (
              <span className="errors">{formik.errors.body}</span>
            ) : (
              ""
            )}
            <textarea
              title="body"
              id="body"
              cols={35}
              rows={15}
              onChange={formik.handleChange}
              value={formik.values.body}
              placeholder="Note content"
            ></textarea>
          </div>

          <button type="submit">Create Note</button>
        </Form>
      </Modal>
    </nav>
  );
};

export default Nav;
