'use client';

import { ReactNode, useActionState, useEffect } from "react";
import Image from "next/image";
import {useRouter} from 'next/navigation';
import {useAuthContext} from '@context/authProvider'

import {signIn} from "@api/auth";
import {
  TLoginLoginDetails,
  TLoginFormState
} from "@definitions/login";

import TextField from "@mui/material/TextField";
import Button from "@ui/common/Button";
import LoginFormElement from "./LoginFormElement";

export default function LoginPage(): ReactNode {
  const router = useRouter();
  const {setUser} = useAuthContext();

  const initialForm = {
    name: "" as TLoginLoginDetails["name"],
    email: "" as TLoginLoginDetails["email"]
  } as TLoginLoginDetails;

  const initialFormState: TLoginFormState = {
    errors: null,
    success: false,
    prevState: initialForm
  }

  const [loginFormState, loginAction, isPending] = useActionState(signIn, initialFormState);

  useEffect(() => {
    if (loginFormState.success) {
      setUser(loginFormState.prevState);
      router.push('/');
    }
  }, [loginFormState, router, setUser])

  return (
    <div className="flex flex-col items-center justify-center h-full">

      <div className="w-[350px] bg-white rounded-lg border border-orange-400 px-6 py-6 drop-shadow-md">
        <div className="flex flex-row gap-2 justify-center pb-4">
          <div className="flex flex-col pt-1">
            <h1 className="text-black text-xl font-bold text-right">{"It's Ruff Without You!"}</h1>
            <h2 className="text-black text-sm  italic text-right">Log in to get started</h2>
          </div>
          <div>
            <Image
              src="/puppers.png"
              width={60}
              height={50}
              alt="Doggo"
            />
          </div>

        </div>

        <form
          action={loginAction}
          aria-describedby="form-error"
          className="flex flex-col gap-2 "
        >
          <LoginFormElement
            errors={loginFormState.errors && loginFormState.errors.name ? loginFormState.errors.name : null}
          >
            <TextField
              label="Username"
              name="name"
              size="small"
              defaultValue={loginFormState.prevState?.name}
              aria-describedby="login-name-error"
            />
          </LoginFormElement>

          <LoginFormElement
            errors={loginFormState.errors && loginFormState.errors.email ? loginFormState.errors.email : null}
          >
            <TextField
              label="Email Address"
              name="email"
              size="small"
              defaultValue={loginFormState.prevState?.email}
              aria-describedby="login-email-error"
            />
          </LoginFormElement>

          <div className="flex flex-row justify-center gap-2">
            <Button
              type="submit"
              theme="primary"
              disabled={isPending}
            >
              {isPending ? "Submited..." : "Log in"}
            </Button>
            <Button
              type="button"
              theme="secondary"
              onClick={() => {
                router.push('/');
              }}
            >
              <p>Cancel</p>
            </Button>
          </div>
        </form>

      </div>
    </div>
  );
}