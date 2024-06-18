import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
import { TogglePassword } from "~/lib/ui/toggle-password";
import { email, minLength, objectAsync, string } from "valibot";
import type { Input as InputValibot } from "valibot";
import {
  formAction$,
  useForm,
  valiForm$,
  type InitialValues,
} from "@modular-forms/qwik";
import redirect from "~/utils/server/redirect";
import { loginDone } from "~/shared/auth";
import LayoutAuth from "~/routes/[...lang]/(auth)/components/layout-auth";
import Input from "~/lib/ui/input/input";
import Button from "~/lib/ui/button/button";
import Text from "~/lib/ui/text/text";
import Link from "~/lib/ui/link/link";
import { i18n } from "~/shared/constants";


const LoginSchema = objectAsync({
  email: string([email(i18n('emailInvalid@@Please enter a valid email address.'))]),
  password: string([
    minLength(1, i18n('passwordRequired@@Password is required.')),
    minLength(8, i18n('passwordLength@@Password must be at least 8 characters long.')),
  ]),
});

type LoginForm = InputValibot<typeof LoginSchema>;

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => ({
  email: "",
  password: "",
}));

export const useFormAction = formAction$<LoginForm>(async (values, req) => {
  const res = await fetch(`${req.env.get("URL_API")}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.status === 200) {
    if (data.isOTP) {
      return redirect(
        302,
        `/otp?type=${data.twoFactorType}&email=${values.email}`,
        req,
      );
    } else {
      loginDone(req, data);
    }
  } else {
    return {
      status: "error",
    };
  }
}, valiForm$(LoginSchema));

export default component$(() => {
  const [loginForm, { Form, Field }] = useForm<LoginForm>({
    loader: useFormLoader(),
    action: useFormAction(),
    validate: valiForm$(LoginSchema),
  });

  return (
    <LayoutAuth>
      <div class="text-center">
        <Text intent="title">{
          i18n('signIn@@Sign in')
        }</Text>
        <Text class="mt-2">
          {i18n('notHaveAccount@@Don\'t have an account yet?')}
          <Link
            class="link-secondary ms-1"
            href="../signup"
            aria-label={i18n('signUpHere@@Sign up here')}
          >
            {i18n('signUpHere@@Sign up here')}
          </Link>
        </Text>
      </div>
      <Form class="mt-8 flex flex-col gap-4 p-4">
        <Field name="email" aria-label={i18n('emailAddress@@Email address')}>
          {(field, props) => (
            <div>
              <label
                for="email"
                class="mb-2 block text-sm dark:text-white"
                aria-label={i18n('emailAddress@@Email address')}
              >
                {i18n('emailAddress@@Email address')}
              </label>
              <Input
                type="email"
                aria-label={i18n('emailAddress@@Email address')}
                sizes="lg"
                placeholder="shahin@example.com"
                {...props}
                value={field.value}
              />
              {field.error && (
                <div class="mt-2 text-xs text-red-500">{field.error}</div>
              )}
            </div>
          )}
        </Field>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm dark:text-white">
            {i18n('password@@Password')}
          </label>
          <Link href="../forgot-password" aria-label={i18n('youForgotPassword@@Forgot password?')}>
            {i18n('youForgotPassword@@Forgot password?')}
          </Link>
        </div>
        <div class="relative">
          <Field name="password">
            {(field, props) => (
              <div>
                <Input
                  type="password"
                  id="password"
                  aria-label={i18n('password@@Password')}
                  sizes="lg"
                  placeholder="********"
                  {...props}
                  value={field.value}
                />
                {field.error && (
                  <div class="mt-2 text-xs text-red-500">{field.error}</div>
                )}
              </div>
            )}
          </Field>
          <TogglePassword />
        </div>
        <Button
          type="submit"
          intent="mecca"
          aria-label={i18n('signIn@@Sign in')}
          disabled={loginForm.submitting}
          class="w-full"
        >
          {loginForm.submitting ? i18n('signingIn@@Signing in...') : i18n('signIn@@Sign in')}
        </Button>
      </Form>
      {loginForm.response.status === "error" && (
        <Text intent="caption" variant="danger">
          {i18n('loginFailed@@Incorrect email or password. Please try again.')}
        </Text>
      )}
    </LayoutAuth>
  );
});

export const head: DocumentHead = () => {
  return {
    title: i18n('signIn@@Sign In'),
    meta: [
      {
        name: "description",
        content: i18n('loginDescription@@Sign in to your account.'),
      },
    ],
  };
};
