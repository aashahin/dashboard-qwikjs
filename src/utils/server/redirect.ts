import type {QwikCityPlan, RequestEventAction} from "@builder.io/qwik-city";

export default function redirect(
    status: number | any,
    url: string,
    req: RequestEventAction<QwikCityPlan>
) {
    const locale = req.locale();
    const defaultLocale = req.env.get("DEFAULT_LOCALE")
    const redirectUrl = locale === defaultLocale ? url : `/${locale}${url}`;
    return req.redirect(status, redirectUrl);
}