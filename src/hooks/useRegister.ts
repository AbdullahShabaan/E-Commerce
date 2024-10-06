import useCheckAvailableEmail from "@hooks/useCheckAvailableEmail";
import { TFormInputs, signUpSchema } from "@validation/SignUpValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import authRegister from "@store/Auth/act/actAuthRegister";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { resetRegisterAndLoginErrors } from "@store/Auth/AuthSlice";
const useRegister = () => {
  const {
    trigger,
    handleSubmit,
    register,
    getFieldState,
    formState: { errors, touchedFields, isValid },
  } = useForm<TFormInputs>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
  });

  const {
    checkEmailAvailability,
    status,
    prevEmail,
    resetCheckAvailableEmail,
  } = useCheckAvailableEmail();

  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, accessToken } = useSelector(
    (state: RootState) => state.AuthSlice
  );
  const navigate = useNavigate();

  const onSubmitForm: SubmitHandler<TFormInputs> = (data) => {
    const { firstName, lastName, password, email } = data;
    dispatch(authRegister({ firstName, lastName, password, email }))
      .unwrap()
      .then((response) => {
        if (response) {
          toast.success("Registration successful!");
          goToLogin();
        }
      });
  };

  const goToLogin = () => {
    navigate("/login");
  };

  type TInputFields = {
    name: "firstName" | "lastName" | "email" | "password" | "confirmPassword";
    label: string;
    type: string;
    icon: string;
  };

  const inputFields: TInputFields[] = [
    { name: "firstName", label: "Your First Name", type: "text", icon: "user" },
    { name: "lastName", label: "Your Last Name", type: "text", icon: "user" },
    { name: "email", label: "Your Email", type: "email", icon: "envelope" },
    { name: "password", label: "Password", type: "password", icon: "lock" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      icon: "key",
    },
  ];

  const onBlurEmailHandler = async (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    await trigger("email");
    const { invalid, isDirty } = getFieldState("email");
    const { value } = event.target;

    if (isDirty && !invalid && value != prevEmail) {
      checkEmailAvailability(value);
    }

    if (isDirty && invalid && prevEmail) {
      resetCheckAvailableEmail();
    }
  };
  useEffect(() => {
    return () => {
      dispatch(resetRegisterAndLoginErrors());
    };
  }, [dispatch]);
  return {
    onBlurEmailHandler,
    inputFields,
    onSubmitForm,
    error,
    loading,
    accessToken,
    checkEmailAvailability,
    status,
    prevEmail,
    resetCheckAvailableEmail,
    errors,
    touchedFields,
    isValid,
    trigger,
    handleSubmit,
    register,
    getFieldState,
  };
};

export default useRegister;
