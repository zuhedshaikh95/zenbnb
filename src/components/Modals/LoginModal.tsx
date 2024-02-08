"use client";
import { useLoginModal } from "@/hooks";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { Button, Heading, Input } from "..";
import Modal from "./Modal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        ...values,
        redirect: false,
      });

      if (response?.error) {
        toast.error(response.error);
        return;
      }

      toast.success("Welcome back!");
      router.refresh();
      loginModal.onClose();
      reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to back" subtitle="Login to your account!" />

      <Input id="email" label="Email" type="email" disabled={isLoading} register={register} errors={errors} required />

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
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => {}} />

      <Button outline label="Continue with Github" icon={AiFillGithub} onClick={() => {}} />

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex text-center justify-center flex-row items-center gap-4">
          <p>Already have an account</p>
          <p className="text-neutral-800 cursor-pointer hover:underline" onClick={loginModal.onClose}>
            Log in
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
