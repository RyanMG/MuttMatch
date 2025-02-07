'use client';

import {API_ROOT} from "@constants/api";
import {
  TLoginLoginDetails,
  TLoginFormState
} from "@definitions/login";
import { z } from 'zod';

const LoginFormSchema = z.object({
  name: z.string().trim().min(5, {
    message: 'Please provide a name of at least 5 characters.'
  }),
  email: z.string().email({
    message: 'Please provide a valid email address.',
  })
});

export const signIn = async (prevState: TLoginFormState | null, formData: FormData): Promise<TLoginFormState> => {

  try {
    const formValues = {
      name: formData.get('name') as TLoginLoginDetails['name'],
      email: formData.get('email') as TLoginLoginDetails['email']
    };

    const validatedFields = LoginFormSchema.safeParse({
      name: formValues.name,
      email: formValues.email
    });

    if (!validatedFields.success) {
      console.log('validatedFields', validatedFields);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing fields. Failed to create new job.',
        prevState: formValues,
        success: false
      }
    }

    const resp = await fetch(`${API_ROOT}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(validatedFields.data)
    })
      .then(payload => {
        return payload.text()
      });

    if (resp !== 'OK') {
      return {
        message: "Unknown response returned from authorizations server",
        success: false
      };
    }

    return {
      success: true,
      prevState: formValues
    };

  } catch (err) {
    console.error("Error logging user in:", err);
    return {
      message: "Error logging in",
      success: false
    } as TLoginFormState;
  }
}

export const signOut = async ():Promise<boolean> => {
  debugger;
  try {
    const resp = await fetch(`${API_ROOT}/auth/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then(payload => payload.text());

    if (resp === "OK" || resp === "Unauthorized") {
      return true;
    }

    return false;

  } catch (err) {
    console.error("Error logging user out:", err);
    return false;
  }
}