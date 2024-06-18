import { $, component$ } from "@builder.io/qwik";
import {
  Form,
  routeAction$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import LayoutAuth from "~/routes/[...lang]/(auth)/components/layout-auth";
import Otp from "~/lib/ui/otp/otp";
import { FaPencilSolid } from "@qwikest/icons/font-awesome";
import Button from "~/lib/ui/button/button";
import Input from "~/lib/ui/input/input";
import Link from "~/lib/ui/link/link";
import Text from "~/lib/ui/text/text";
import * as v from "valibot";
import redirect from "~/utils/server/redirect";
import Icon from "~/lib/ui/icon/icon";
import { i18n } from "~/shared/constants";

const emailSchema = v.object({
  email: v.string([v.email()]),
});

const verifySchema = v.object(
  {
    password: v.string([v.minLength(8, "password_min_length")]),
    passwordConfirm: v.string([v.minLength(8, "password_confirm_min_length")]),
  },
  [
    v.custom(
      (data) => data.password === data.passwordConfirm,
      "password_mismatch",
    ),
  ],
);

export const useActionSend = routeAction$(async (data, req) => {
  const checkInput = v.safeParse(emailSchema, data);
  if (checkInput.issues) {
    return {
      invalidInput: true,
    };
  }

  const { email } = data;
  const response = await fetch(
    `${req.env.get("URL_API")}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );
  if (response.status === 201) {
    return {
      success: true,
      message: response.statusText,
      email,
    };
  } else {
    return {
      message: response.statusText,
      error: true,
    };
  }
});

export const useActionReset = routeAction$(async (data, req) => {
  const validate = v.safeParse(verifySchema, data);
  const { issues } = validate;
  if (issues) {
    if (issues[0].message === "password_mismatch") {
      return {
        passwordMismatch: true,
      };
    } else if (issues[0].message === "password_min_length") {
      return {
        passwordMinLength: true,
      };
    } else if (issues[0].message === "password_confirm_min_length") {
      return {
        passwordConfirmMinLength: true,
      };
    }
  }
  const code = Object.keys(data)
    .filter((key) => key.startsWith("otp"))
    .map((key) => data[key])
    .join("");
  if (code.length !== 6) {
    return {
      invalidOtp: true,
    };
  }

  const { password, passwordConfirm } = data;
  const email = req.url.searchParams.get("email");
  const response = await fetch(
    `${req.env.get("URL_API")}/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code: Number(code),
        password,
        passwordConfirm,
      }),
    },
  );
  if (response.status === 201) {
    redirect(302, "/login", req);
    return { success: true };
  } else {
    return { error: true };
  }
});

export default component$(() => {
  const sendOTP = useActionSend();
  const verifyOTP = useActionReset();
  const location = useLocation();
  const nav = useNavigate();
  const email = location.url.searchParams.get("email") || "";
  const onSubmitOne = $(async (e: Event | any) => {
    e.preventDefault();
    if (sendOTP.value && sendOTP.value.success) {
      const email = sendOTP.value.email as string;
      location.url.searchParams.set("email", email);
    }
  });

  return (
    <LayoutAuth>
      {!email ? (
        <div class="flex flex-col gap-6">
          <Text intent="title" class="text-center">
            {i18n('forgotPassword@@Forgot Password')}
          </Text>
          <Form
            action={sendOTP}
            class="flex flex-col gap-3"
            onSubmit$={onSubmitOne}
          >
            <label aria-label={i18n('emailAddress@@Email Address')} for="email">
              {i18n('emailAddress@@Email Address')}
            </label>
            <Input
              type="email"
              class="input"
              id="email"
              name="email"
              aria-label={i18n('emailAddress@@Email Address')}
              value={email}
              variant="mecca"
              sizes="lg"
              placeholder="shahin@example.com"
            />
            {sendOTP.value?.invalidInput && (
              <Text intent="caption" variant="danger">
                {i18n('emailInvalid@@Invalid email address')}
              </Text>
            )}
            <Button type="submit" aira-label="Send OTP" intent="mecca">
              {i18n('sendOtp@@Send OTP')}
            </Button>
            {sendOTP.value?.error && (
              <Text intent="caption" variant="danger">
                {i18n('otpEmailInvalid@@Failed to send OTP. Please check your email address')}
              </Text>
            )}
          </Form>
        </div>
      ) : (
        <div>
          <Form class="flex flex-col gap-2" action={verifyOTP}>
            <div class="mx-auto flex items-center" dir="ltr">
              <span class="font-bold text-accent" aria-label={email}>
                {email}
              </span>
              <Icon
                aria-label="Edit Email"
                variant="primary"
                radius="rounded"
                onClick$={async () => {
                  location.url.searchParams.delete("email");
                  await nav();
                }}
              >
                <FaPencilSolid class="h-4 w-4 text-primary" />
              </Icon>
            </div>
            <div class="mt-4 flex flex-col gap-3">
              <Text intent="body">
                {i18n('otpEmail@@Enter the OTP sent to your email')}
              </Text>
              <Otp />
              <Link
                href="../forgot-password"
                aria-label="Resend OTP"
                class="text-end"
              >
                {i18n('notReceive@@Didn\'t receive the OTP? Resend OTP')}
              </Link>
              {verifyOTP.value?.invalidOtp && (
                <div class="text-sm text-red-500">
                  {i18n('otpRequired@@Must be a 6-digit number')}
                </div>
              )}
            </div>
            <hr class="my-2 border-gray-300" />
            <label aria-label={i18n('newPassword@@New Password')} for="password">
              {i18n('newPassword@@New Password')}
            </label>
            <Input
              type="password"
              class="input"
              id="password"
              name="password"
              aria-label={i18n('newPassword@@New Password')}
              variant="mecca"
              sizes="lg"
              placeholder="********"
            />
            {verifyOTP.value?.passwordMinLength && (
              <Text intent="caption" variant="danger" class="my-1">
                {i18n('passwordLength@@Password must be at least 8 characters long')}
              </Text>
            )}
            <label aria-label={i18n('confirmPassword@@Confirm Password')} for="passwordConfirm">
              {i18n('confirmPassword@@Confirm Password')}
            </label>
            <Input
              type="password"
              class="input"
              id="passwordConfirm"
              name="passwordConfirm"
              aria-label={i18n('confirmPassword@@Confirm Password')}
              variant="mecca"
              sizes="lg"
              placeholder="********"
            />
            {verifyOTP.value?.passwordConfirmMinLength ? (
              <Text intent="caption" variant="danger" class="my-1">
                {i18n('confirmPasswordInvalid@@Confirm Password must be at least 8 characters long')}
              </Text>
            ) : verifyOTP.value?.passwordMismatch ? (
              <Text intent="caption" variant="danger" class="my-1">
                {i18n('matchPasswordInvalid@@Passwords do not match')}
              </Text>
            ) : null}
            <Button
              type="submit"
              disabled={verifyOTP.isRunning || verifyOTP.value?.success}
              aria-label={i18n('resetPassword@@Reset Password')}
              intent="mecca"
              class="mt-2"
            >
              {verifyOTP.isRunning
                ? i18n('pleaseWait@@Please wait...')
                : i18n('resetPassword@@Reset Password')}
            </Button>
            <Link href="../login" class="mt-2 text-center">
              {i18n('backToLogin@@Back to login')}
            </Link>
          </Form>
          {verifyOTP.value?.error ? (
            <Text intent="caption" variant="danger">
              {i18n('resetPasswordInvalid@@Failed to reset password. Please try again.')}
            </Text>
          ) : null}
        </div>
      )}
    </LayoutAuth>
  );
});

export const head: DocumentHead = () => {
  return {
    title: i18n("forgotPassword@@Forgot Password"),
  };
};
