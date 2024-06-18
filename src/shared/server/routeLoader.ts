import {routeLoader$} from "@builder.io/qwik-city";

export const useEnvBaseAPI = routeLoader$((req) => {
    return req.env.get("URL_API");
})