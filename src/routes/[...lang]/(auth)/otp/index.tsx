import { $, component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Form, routeAction$, useLocation } from "@builder.io/qwik-city";
import { loginDone } from "~/shared/auth";
import { toast } from "qwik-sonner";
import { useEnvBaseAPI } from "~/shared/server/routeLoader";
import LayoutAuth from "~/routes/[...lang]/(auth)/components/layout-auth";
import Text from "~/lib/ui/text/text";
import Button from "~/lib/ui/button/button";
import { i18n } from "~/shared/constants";
import Otp from "~/lib/ui/otp/otp";

export { useEnvBaseAPI } from "~/shared/server/routeLoader";

export const useOtpAction = routeAction$(async (values, req) => {
  const newValues = Object.values(values).join("");
  if (newValues.length !== 6) {
    return {
      invalidInput: true,
    };
  }
  const email = req.url.searchParams.get("email");
  if (!email) {
    return {
      error: true,
    };
  }
  const res = await fetch(`${req.env.get("URL_API")}/auth/otp`, {
    method: "POST",
    body: JSON.stringify({
      otp: newValues,
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    loginDone(req, data);
  } else {
    return {
      error: true,
    };
  }
});

export default component$(() => {
  const otpAction = useOtpAction();
  const env = useEnvBaseAPI().value;
  const location = useLocation();
  const typeOtp = location.url.searchParams.get("type");
  const email = location.url.searchParams.get("email");

  const resendOtp = $(async () => {
    const res = await fetch(`${env}/security/send`, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data === true) {
      toast.success(i18n('otpSendSuccess@@Verification code sent successfully'));
    } else {
      toast.error(i18n('otpSendInvalid@@Failed to send verification code. Please try again.'));
    }
  });

  return (
    <LayoutAuth>
      <Text intent="title" class="text-center">
        {i18n('otpCode@@Enter the verification code')}
      </Text>
      <div class="mt-4">
        <Form class="flex flex-col justify-center space-y-4" action={otpAction}>
          <Text intent="body">
            {typeOtp === "EMAIL"
              ? i18n('otpEmail@@Enter the verification code sent to your email')
              : typeOtp === "SMS"
                ? i18n('otpSMS@@Enter the verification code sent to your phone')
                : i18n('otp@@Enter the verification code sent to your authenticator app')
            }
          </Text>
          <Otp />
          {otpAction.value?.invalidInput && (
            <div class="mt-1 text-xs text-red-500">
              {
                i18n('otpRequired@@Must be 6 digits')
              }
            </div>
          )}
          <Button type="submit" intent="mecca" disabled={otpAction.isRunning}>
            {otpAction.isRunning ? i18n('verifying@@Verifying...') : i18n('verify@@Verify')}
          </Button>
          <Button
            intent="mecca"
            variant="linkSecondary"
            aria-label="Resend OTP"
            onClick$={resendOtp}
            type="button"
          >
            {i18n('reSendOtp@@Resend verification code')}
          </Button>
          {otpAction.value?.error && (
            <div class="mt-1 text-xs text-red-500">
              {i18n('otpInvalid@@Invalid verification code. Please try again.')}
            </div>
          )}
        </Form>
      </div>
    </LayoutAuth>
  );
});

export const head: DocumentHead = () => {
  return {
    title: i18n('verify@@Verify'),
    meta: [
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  };
};
