import useRegister from "@hooks/useRegister";
import { Navigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import registerAnimation from "@assets/eCommerce.json";
import Lottie from "lottie-react";
import InputForm from "@components/common/Form/InputForm/InputForm";

function Register() {
  const {
    onBlurEmailHandler,
    inputFields,
    onSubmitForm,
    error,
    loading,
    accessToken,
    status,
    errors,
    touchedFields,
    isValid,
    handleSubmit,
    register,
  } = useRegister();

  if (accessToken) return <Navigate to="/" />;

  return (
    <MDBContainer fluid>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <MDBRow className="justify-content-center">
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <h1 className="text-center fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign Up
                </h1>

                {inputFields.map(({ name, label, type, icon }) => (
                  <InputForm
                    key={name}
                    name={name}
                    label={label}
                    type={type}
                    icon={icon}
                    register={register}
                    error={errors[name]?.message}
                    touchedFields={touchedFields[name]}
                    onBlur={name == "email" ? onBlurEmailHandler : undefined}
                    validationText={name == "email" ? status : undefined}
                  />
                ))}

                <button
                  disabled={!isValid || loading == "pending"}
                  type="submit"
                  className="btn btn-danger mt-4 px-2 py-1"
                >
                  {loading == "pending" ? (
                    <i className="fa fa-spinner fa-spin px-3 py-1"></i>
                  ) : (
                    "Register"
                  )}
                </button>
                {error && <p className="pt-2 text-danger">{error}</p>}
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <Lottie animationData={registerAnimation} loop={true} />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Register;
