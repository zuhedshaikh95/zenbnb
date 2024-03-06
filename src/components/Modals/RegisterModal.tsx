"use client";
import { useLoginModal, useRegisterModal } from "@/hooks";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Button, Heading, Input } from "..";
import Modal from "./Modal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/register", values);
      loginModal.onOpen();
      registerModal.onClose();
    } catch (error: any) {
      if (error instanceof AxiosError && error.response?.data) {
        toast.error(error.response.data.message);
        return;
      }
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggle = useCallback(() => {
    loginModal.onOpen();
    registerModal.onClose();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-3">
      <Heading title="Welcome to Zenbnb" subtitle="Create an account!" />

      <Input id="email" label="Email" type="email" disabled={isLoading} register={register} errors={errors} required />

      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex gap-4 items-center">
        <hr className="w-full" />
        <p className="text-sm">or</p>
        <hr className="w-full" />
      </div>

      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn("google")} />

      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => signIn("github")} />

      <div className="text-neutral-500 text-center font-light">
        <div className="flex text-center justify-center flex-row items-center gap-2">
          <p>Already have an account?</p>
          <p className="text-neutral-800 cursor-pointer hover:underline" onClick={toggle}>
            Log in
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
