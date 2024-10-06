import { useForm, SubmitHandler } from "react-hook-form";
import { TFormInputs, signInSchema } from "@validation/SignInValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/store";
import authLogin from "@store/Auth/act/actAuthLogin";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { resetRegisterAndLoginErrors } from "@store/Auth/AuthSlice";
const useLogin = () => {
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
  return {
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
  };
};

export default useLogin;
