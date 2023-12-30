import * as React from "react";
import DoctorForm from "../../components/form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddDoctor(props) {
  const navigat = useNavigate();
  /******************************************** */
  const handleSubmit = (e) => {
    // e.preventDefault();
    props.checkValidation();
    props.setIsLoading(true);

    axios
      .post("http://localhost:3000/doctors", {
        name: props.formData.name,
        specialty: props.formData.specialty,
        location: props.formData.location,
      })
      .then((response) => {
        // console.log("Post created:", response.data);
        props.showSnackbar(
          `Post with ${JSON.stringify(response.data.id)}'s userId created...`
        );
        // Reset form fields after successful update
        props.setFormData({
          id: 0,
          name: "",
          specialty: "",
          location: "",
        });
        // Save the empty form data to localStorage
        localStorage.setItem("formData", JSON.stringify(props.formData));
      })

      .catch((err) => {
        console.error("Error creating post:", err);
        props.showSnackbar(`Error creating post: ${JSON.stringify(err)}`);
      })
      .finally(() => {
        props.setIsLoading(false);
        console.log(props.isLoading);
      });

    navigat("/table");
  }; //http://localhost:3005/user

  return (
    <DoctorForm
      formData={props.formData}
      setFormData={props.setFormData}
      formErrors={props.formErrors}
      setFormErrors={props.setFormErrors}
      isLoading={props.isLoading}
      setIsLoading={props.setIsLoading}
      showSnackbar={props.showSnackbar}
      snackbarOpen={props.snackbarOpen}
      snackbarMessage={props.snackbarMessage}
      validateField={props.validateField}
      checkValidation={() => props.checkValidation(props.formData)}
      transition={props.transition}
      setTransition={props.setTransition}
      submitHandler={handleSubmit} // AddDoctor specific function
      buttonText="Create Doctor"
    />
  );
}
