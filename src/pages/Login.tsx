import useLogin from "@hooks/useLogin";
import { Navigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import loginAnimation from "@assets/loginAnimation.json";
import Lottie from "lottie-react";
import InputForm from "@components/common/Form/InputForm/InputForm";

function Login() {
  const {
    inputFields,
    onSubmitForm,
    error,
    loading,
    accessToken,
    handleSubmit,
    register,
    errors,
    touchedFields,
    isValid,
  } = useLogin();

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
                  Sign In
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
                    login={true}
                  />
                ))}

                <button
                  disabled={!isValid || loading == "pending"}
                  type="submit"
                  className="btn btn-danger mt-1 px-2 py-1 ms-4"
                >
                  {loading == "pending" ? (
                    <i className="fa fa-spinner fa-spin px-3 py-1"></i>
                  ) : (
                    "Login"
                  )}
                </button>
                {error && <p className="pt-2 text-danger ms-4">{error}</p>}
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <Lottie animationData={loginAnimation} loop={true} />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Login;
