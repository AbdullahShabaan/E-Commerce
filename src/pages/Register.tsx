import { TFormInputs, signUpSchema } from "@validation/SignUpValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
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
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
  };

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
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                  Sign up
                </p>

                <InputForm
                  name="firstName"
                  label="Your First Name"
                  type="text"
                  icon="user"
                  register={register}
                  error={errors.firstName?.message}
                  touchedFields={touchedFields.firstName}
                />
                <InputForm
                  name="lastName"
                  label="Your Last Name"
                  type="text"
                  icon="user"
                  register={register}
                  error={errors.lastName?.message}
                  touchedFields={touchedFields.lastName}
                />

                <InputForm
                  name="email"
                  label="Your Email"
                  type="email"
                  icon="envelope"
                  register={register}
                  error={errors.email?.message}
                  touchedFields={touchedFields.email}
                />

                <InputForm
                  name="password"
                  label="Password"
                  type="password"
                  icon="lock"
                  register={register}
                  error={errors.password?.message}
                  touchedFields={touchedFields.password}
                />
                <InputForm
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  icon="key"
                  register={register}
                  error={errors.confirmPassword?.message}
                  touchedFields={touchedFields.confirmPassword}
                />

                <button className="btn btn-primary">Register</button>
              </MDBCol>
              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <Lottie animationData={registerAnimation} loop={true}></Lottie>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </form>
    </MDBContainer>
  );
}

export default Register;
