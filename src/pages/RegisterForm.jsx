import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Styled, emailRegexp } from "../Constants";
import { registerUser } from "../redux/auth/actions";
import { useNavigate } from "react-router-dom";

const registerInputsData = [
  {
    id: 0,
    inputType: "text",
    inputName: "fullName",
    labelName: "Full Name",
    placeholder: "Enter your full name",
    validationRules: {
      required: "Required field!",
    },
  },
  {
    id: 1,
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
    id: 2,
    inputType: "password",
    labelName: "Password",
    placeholder: "Enter your password",
    inputName: "password",
    validationRules: {
      required: "Required field!",
      minLength: {
        value: 6,
        message: "Must be at least 4 characters long",
      },
    },
  },
];

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {
    await dispatch(registerUser({ ...data }));
    reset();
    navigate("/login");
  };

  return (
    <Styled.Wrapper>
      <p>Registration</p>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        {registerInputsData.map((item) => (
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
            Register
          </Styled.Button>
          <Styled.Button
            onClick={() => {
              navigate("/login");
            }}
          >
            Cancel
          </Styled.Button>
        </Styled.ButtonLine>
      </Styled.Form>
    </Styled.Wrapper>
  );
};

export default RegistrationForm;
