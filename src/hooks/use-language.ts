import { useLocation } from "@builder.io/qwik-city";

const useLanguage = () => {
  let { params: {lang} } = useLocation();

  if (!lang) {
    lang = 'en';
  }

  return lang;
}

export default useLanguage;