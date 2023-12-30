import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DoctorForm from "../../components/DoctorForm";

function EditDoctor(props) {
  const { id } = useParams();

  const [doctors, setDoctors] = React.useState([]);

  const navigat = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/doctors/" + id)
      .then((response) => {
        const doctor = response.data;

        if (doctor) {
          props.setFormData({
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
            location: doctor.location,
          });
        } else {
          props.showSnackbar(`Employee not defined!!`);
        }
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []); //http://localhost:3005/user/${id}

  const onUpdateDoctor = (formData) => {
    // Find the index of the doctor to update in the doctors array
    const doctorIndex = doctors.findIndex((emp) => emp.id === formData.id);

    if (doctorIndex !== -1) {
      // Create a copy of the doctors array
      const updateDoctors = [...doctors];

      // Update the doctor with the new data
      updateDoctors[doctorIndex] = formData;

      // Update the state with the new array
      setDoctors(updateDoctors);
    }
  };
  const handleSubmit = (e) => {
    props.checkValidation();
    props.setIsLoading(true);
    // Update the employee in your JSON file or database
    axios
      .put("http://localhost:3000/doctors/" + id, props.formData)
      .then(() => {
        onUpdateDoctor(props.formData);
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
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        props.setIsLoading(false);
      });
    // Redirect the user or show a success message
    props.showSnackbar("data successfully updated...");
    navigat("/table");
  };

  return (
    <DoctorForm
      formData={props.formData}
      setFormData={props.setFormData}
      formErrors={props.formErrors}
      setFormErrors={props.setFormErrors}
      isLoading={props.isLoading}
      setIsLoading={props.setIsLoading}
      showSnackbar={props.showSnackbar}
      checkValidation={props.checkValidation}
      validateField={props.validateField}
      transition={props.transition}
      setTransition={props.setTransition}
      buttonText="Edit Doctor"
      submitHandler={handleSubmit}
    />
  );
}

export default EditDoctor;
