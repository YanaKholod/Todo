import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Styled = {
  WrapperForm: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    font-size: 20px;
    p {
      color: rgb(36, 50, 70);
    }
    @media (max-width: 620px) {
      width: 250px;
    }
  `,
  Form: styled.form`
    width: 100%;
    margin: 0 auto;
  `,
  Errors: styled.div`
    color: #ae4141;
    font-size: 10px;
  `,
  RadioButtons: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
  WrapperButtons: styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 12px;
  `,
  InputText: styled.input`
    background-color: #ffffff;
    border-color: #5f7ca9;
    box-sizing: border-box;
    border-radius: 8px;
    width: 100%;
    padding: 6px 10px;
    font-size: 17px;
  `,
  InputDescription: styled.textarea`
    background-color: #ffffff;
    box-sizing: border-box;
    border-color: #5f7ca9;
    width: 100%;
    height: 200px;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 17px;
  `,
  DefaultButton: styled.button`
    color: #374a66;
    padding: 7px 25px;
    border-radius: 20px;
    border-color: #243246;
    background-color: #80a6deb3;
    margin: 0 10px;
    &:hover {
      background-color: #156837a1;
      color: #0c371e;
    }
  `,
};
export const Form = ({
  setShowModal = null,
  onFormSubmit,
  initialData,
  buttonName,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      title: initialData ? initialData.title : undefined,
      description: initialData ? initialData.description : undefined,
      isCompleted: initialData ? initialData.isCompleted : false,
    },
  });
  const { todosArray } = useSelector((state) => state.todos);

  const onSubmit = (data) => {
    const formData = {
      ...data,
      parentTodo: data.parentTodo.length > 0 ? data.parentTodo : null,
    };
    onFormSubmit(formData, initialData ? initialData._id : "");
    setShowModal ? setShowModal(false) : reset();
  };

  const onCancelClick = () => {
    setShowModal ? setShowModal(false) : reset();
  };

  return (
    <Styled.WrapperForm>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p>Parent Todo:</p>
          <select {...register("parentTodo")}>
            <option value="">Select a parent todo</option>
            {todosArray.map((todo) => (
              <option key={todo._id} value={todo._id}>
                {todo.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          <p>Title:</p>
          <Styled.InputText
            {...register("title", {
              required: "Required field!",
              minLength: {
                value: 5,
                message: "Must be more than 5 symbols",
              },
            })}
            style={{ border: errors.title ? "2px solid red" : "" }}
          ></Styled.InputText>
        </label>
        <Styled.Errors>
          {errors?.title && <p>{errors?.title?.message}</p>}
        </Styled.Errors>
        <label>
          <p> Description:</p>
          <Styled.InputDescription
            {...register("description", {
              required: "Required field!",
              minLength: {
                value: 5,
                message: "Must be more symbols",
              },
            })}
            style={{ border: errors.description ? "2px solid red" : "" }}
          ></Styled.InputDescription>
        </label>
        <Styled.Errors>
          {errors?.description && <p>{errors?.description?.message}</p>}
        </Styled.Errors>
        <Styled.RadioButtons>
          <label>In progress</label>
          <input
            value={false}
            defaultChecked
            type="radio"
            {...register("isCompleted", { required: true })}
          ></input>
          <label>Done</label>
          <input
            value={true}
            type="radio"
            {...register("isCompleted", { required: true })}
          ></input>
        </Styled.RadioButtons>
        <Styled.WrapperButtons>
          <Styled.DefaultButton type="reset" onClick={() => onCancelClick()}>
            Cancel
          </Styled.DefaultButton>
          <Styled.DefaultButton type="submit">
            {buttonName}
          </Styled.DefaultButton>
        </Styled.WrapperButtons>
      </Styled.Form>
    </Styled.WrapperForm>
  );
};

export default Form;
