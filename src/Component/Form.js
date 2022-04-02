import React from "react";
import { useState } from "react";
import "./Form.scss";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const nav = useNavigate();
  const [values, setValues] = useState({
    certification: "",
    issuer: "",
    image: "",
    error: "",
    success: false,
    formData: new FormData(),
  });

  const { formData, error, success } = values;

  const onHandleChange = (certification) => (event) => {
    const value =
      certification === "image" ? event.target.files[0] : event.target.value;
    formData.set(certification, value);
    console.log(value);
    setValues({ ...values, [certification]: value });
  };

  const api = (data) => {
    return fetch(`https://task-back-end.herokuapp.com/userDetail`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="container" id="container">
        <div className="form-container personal-in-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Certification Name</label>
            <input
              type="text"
              value={values.certification}
              onChange={onHandleChange("certification")}
              placeholder="Enter certification name"
            />
            {error && !values.certification ? (
              <span style={{ color: "red" }}>
                * please enter certification name
              </span>
            ) : (
              " "
            )}

            <label>Issuer</label>
            <input
              type="text"
              value={values.issuer}
              onChange={onHandleChange("issuer")}
              placeholder="Enter issuer"
            />
            {error && !values.issuer ? (
              <span style={{ color: "red" }}>* please enter issuer name</span>
            ) : (
              " "
            )}
            <label>Upload a file showing your certification</label>
            <input
              type="file"
              onChange={onHandleChange("image")}
              placeholder="Upload a file showing your certification"
            />

            <button
              title="butt"
              onClick={() =>
                api(formData).then((res) => {
                  if (res.error) {
                    setValues({
                      ...values,
                      success: false,
                      error: res.error,
                    });
                  } else {
                    setValues({ ...values, success: true, error: "" });
                    nav("/list");
                  }
                })
              }
            >
              SAVE CERTIFICATION
            </button>
            {success && (
              <div
                style={{ fontSize: "20px", color: "green", fontWeight: 600 }}
              >
                Your data successfully saved
              </div>
            )}
            {error && (
              <div style={{ fontSize: "20px", color: "red", fontWeight: 600 }}>
                {error}
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;
