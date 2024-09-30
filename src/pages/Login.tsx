import { useForm, SubmitHandler } from "react-hook-form";
import { TFormInputs, signInSchema } from "@validation/SignInValidation";
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
import { zodResolver } from "@hookform/resolvers/zod";

function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const onSubmitForm: SubmitHandler<TFormInputs> = (data) => {
    console.log(data);
  };
  type TInputFields = {
    name: "email" | "password";
    label: string;
    type: string;
    icon: string;
  };
  const inputFields: TInputFields[] = [
    { name: "email", label: "Your Email", type: "email", icon: "envelope" },
    { name: "password", label: "Password", type: "password", icon: "lock" },
  ];

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
                  />
                ))}

                <button type="submit" className="btn btn-primary mt-4">
                  Login
                </button>
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
