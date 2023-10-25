import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/auth/actions";
import { Styled, emailRegexp } from "../Constants";
import { useNavigate } from "react-router-dom";

const loginInputsData = [
  {
    id: 0,
    inputType: "email",
    inputName: "email",
    labelName: "Email",
    placeholder: "Enter your email",
    validationRules: {
      required: "Required field!",
      pattern: {
        value: emailRegexp,
      },
    },
  },
  {
    id: 1,
    inputType: "password",
    labelName: "Password",
    placeholder: "Enter your password",
    inputName: "password",
    validationRules: {
      required: "Required field!",
      minLength: {
        value: 6,
        message: "Must be at least 5 characters long",
      },
    },
  },
];
const LoginForm = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await dispatch(login({ ...data }));
    reset();
    navigate("/main");
  };

  return (
    <Styled.Wrapper>
      <p>Login</p>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        {loginInputsData.map((item) => (
          <Styled.Field key={item.id}>
            <Styled.Label>{item.labelName}</Styled.Label>
            <Styled.Input
              type={item.inputType}
              {...register(item.inputName, item.validationRules)}
              placeholder={item.placeholder}
            />
            <Styled.Errors>
              {errors[item.inputName] && (
                <span>{errors[item.inputName].message}</span>
              )}
            </Styled.Errors>
          </Styled.Field>
        ))}
        <Styled.ButtonLine>
          <Styled.Button type="submit" disabled={!isValid}>
            Login
          </Styled.Button>
          <Styled.Button
            onClick={() => {
              navigate("/register");
            }}
          >
            Cancel
          </Styled.Button>
        </Styled.ButtonLine>
      </Styled.Form>
    </Styled.Wrapper>
  );
};

export default LoginForm;
