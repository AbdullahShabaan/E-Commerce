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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import authLogin from "@store/Auth/act/actAuthLogin";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { resetRegisterAndLoginErrors } from "@store/Auth/AuthSlice";

function Login() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields, isValid },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, loading, accessToken } = useSelector(
    (state: RootState) => state.AuthSlice
  );
  const onSubmitForm: SubmitHandler<TFormInputs> = (data) => {
    dispatch(authLogin(data))
      .unwrap()
      .then(() => {
        toast.success("Welcome to GoShop!");
        navigate("/");
      })
      .catch(() => reset());
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

  useEffect(() => {
    return () => {
      dispatch(resetRegisterAndLoginErrors());
    };
  }, [dispatch, accessToken]);

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
