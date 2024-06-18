import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useVisibleTask$,
  useOnDocument,
  useContext,
  useStore,
} from "@builder.io/qwik";
import { i18n } from "~/shared/constants";
import { LuArrowDown } from "@qwikest/icons/lucide";
import infoMajna from "~/info";
import mdn from "~/shared/content/mdn";
import Logo from "~/../public/assets/logo/logo.svg?jsx";
import CloseIcon from "~/../public/assets/icons/colse.svg?jsx";
import ImgRobot from "~/../public/assets/3d/robot.svg?jsx";
import { AiModalProvider } from "~/routes/[...lang]/(dashboard)/admin/layout";

type ChatHistoryProps = [
  {
    answer: string;
    id: number;
    question: string;
  },
];

type Props = {
  userData: any;
  apiURL: string;
  accessToken: string;
};
const md = mdn();

type ChatHistoryComponentProps = {
  userData: any;
  oldMessages: ChatHistoryProps;
  newMessages: any[];
};

export const ChatHistory$ = component$(
  ({ userData, oldMessages, newMessages }: ChatHistoryComponentProps) => {
    const value = [...oldMessages, ...newMessages];
    return value.map(
      ({ answer, id, question }) =>
        question && (
          <ul key={id} class="space-y-2 overflow-x-hidden">
            <li class="ms-auto flex max-w-full justify-end gap-x-2 sm:gap-x-3">
              <div class="grow space-y-3 text-end">
                <div class="inline-block rounded-lg bg-blue-600 p-4 shadow-sm dark:bg-blue-900">
                  <div
                    class="prose prose-slate text-sm text-white w-fit dark:prose-invert"
                    dangerouslySetInnerHTML={md.render(question)}
                  ></div>
                </div>
              </div>
              <img
                class="flex-shrink-0 rounded-full w-10 h-10"
                width="368"
                height="368"
                src={userData.avatarURL || "/assets/bubble-gum-avatar-icon.png"}
                alt={userData.firstName}
              />
            </li>
            <li class="flex gap-x-2 sm:gap-x-3">
              <div class="relative">
                <div class="flex-shrink-0 rounded-full">
                  <Logo style="width: 38px; height: 38px;" />
                </div>
                <span class="absolute start-7 top-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500 dark:border-gray-800"></span>
              </div>

              <div class="w-full max-w-[90%] grow space-y-3 md:max-w-fit overflow-x-scroll">
                <div class="space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div
                    class="prose text-sm text-gray-800 dark:prose-invert dark:text-white"
                    dangerouslySetInnerHTML={md.render(answer)}
                  ></div>
                </div>
              </div>
            </li>
          </ul>
        ),
    );
  },
);

const Chat$ = component$(({ userData, loading, apiURL, accessToken }: any) => {
  const loadChatHistory = useSignal(false);
  const words = useSignal("");
  const wordsLengthStyle = useSignal(
    "text-gray-500 dark:text-gray-400 text-sm",
  );
  const newMessages = useStore<any>([]);

  useVisibleTask$((ctx) => {
    // Hidden scrollToBottom if end of chat is visible
    const chatEndRef = document.querySelector(".chatEndRef");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const scrollToBottom = document.getElementById("scrollToBottom");
        if (entry.isIntersecting) {
          scrollToBottom?.classList.add("hidden");
        } else {
          scrollToBottom?.classList.remove("hidden");
        }
      });
    });
    observer.observe(chatEndRef as Element);

    // Update words length style
    ctx.track(() => words.value);
    if (words.value.length === 500) {
      wordsLengthStyle.value = "text-red-500 dark:text-red-400 text-sm";
    } else {
      wordsLengthStyle.value = "text-gray-500 dark:text-gray-400 text-sm";
    }
  });

  const chatHistory = useResource$(async ({ track }) => {
    track(() => loadChatHistory.value);

    const res = await fetch(`${apiURL}/copilot`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.json();
  });

  const sendChatMessage = $(async (e: Event) => {
    e.preventDefault();
    const comment = document.getElementById("comment") as HTMLTextAreaElement;
    if (comment.value.length <= 3) {
      loading.value = false;
      return;
    }
    loading.value = true;

    const res = await fetch(`${apiURL}/copilot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        question: comment.value,
      }),
    });

    const answer = await res.text();
    newMessages.push({
      question: comment.value,
      answer: answer,
      id: Math.random(),
    });

    comment.value = "";
    loading.value = false;
  });

  return (
    <div class="relative space-y-4 p-4 md:p-5">
      <Resource
        value={chatHistory}
        onPending={() => <p>Loading...</p>}
        onResolved={(value: ChatHistoryProps) => (
          <ChatHistory$
            userData={userData}
            oldMessages={value}
            newMessages={newMessages}
          />
        )}
      />
      <div class="chatEndRef"></div>

      <button
        type="button"
        id="scrollToBottom"
        class="sticky bottom-44 rounded-full border bg-white p-2 text-gray-500 shadow-lg hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        onClick$={() => {
          const chatEndRef = document.querySelector(".chatEndRef");
          chatEndRef?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <LuArrowDown class="size-4 flex-shrink-0" />
      </button>
      <form class="sticky bottom-0 bg-white dark:bg-gray-700">
        <div class="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div class="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label for="comment" class="sr-only">
              {i18n("ai.yourMessage")}
            </label>
            <textarea
              id="comment"
              rows={2}
              class="w-full resize-none border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder={i18n("ai.yourMessage")}
              required
              bind:value={words}
              maxLength={500}
            ></textarea>
          </div>
          <div class="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
            <button
              type="button"
              class={
                "inline-flex items-center rounded-lg bg-blue-700 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900" +
                (loading.value ? " cursor-not-allowed opacity-50" : "")
              }
              onClick$={sendChatMessage}
              disabled={loading.value}
            >
              {!loading.value ? (
                i18n("send")
              ) : (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </button>
            <p id="wordsLength" class={wordsLengthStyle.value}>
              {words.value.length}/500
            </p>
          </div>
        </div>
        <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">
          {i18n("ai.aiFaceSlowReadArticle")}{" "}
          <a
            href={infoMajna.ai.slowResponse}
            class="text-blue-600 hover:underline dark:text-blue-500"
            target="_blank"
          >
            {i18n("clickHere")}
          </a>
        </p>
      </form>
    </div>
  );
});

const Header = component$(() => (
  <div class="flex items-center justify-between rounded-t border-b p-3 dark:border-gray-600">
    <div class="flex gap-1">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
        {i18n("ai.aiChat")}
      </h3>
      <span class="me-2 rounded bg-green-100 px-2.5 py-0.5 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
        {i18n("beta")}
      </span>
    </div>

    <button
      type="button"
      class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
      data-modal-hide="ai-modal"
    >
      <CloseIcon class="size-4" />
      <span class="sr-only">Close</span>
    </button>
  </div>
));

const Title = component$(() => (
  <div class="sticky left-0 right-0 top-0 z-50 border-b bg-white dark:border-gray-600 dark:bg-gray-700">
    <Header />
    <div class="sticky left-0 right-0 top-0 z-50 space-y-4 border-b bg-white p-4 text-center md:p-5 dark:border-gray-600 dark:bg-gray-700">
      <h1 class="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
        {i18n("ai.aiChatModalAdminTitle")}
      </h1>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        {i18n("ai.aiChatModalAdminDesc")}
      </p>
    </div>
  </div>
));

export default component$(({ userData, apiURL, accessToken }: Props) => {
  const loading = useSignal(false);
  const modal = useContext(AiModalProvider);

  useVisibleTask$(
    async (ctx) => {
      const chatEndRef = document.querySelector(".chatEndRef");
      ctx.track(() => modal.value);
      ctx.track(() => loading.value);
      if (chatEndRef) {
        chatEndRef.scrollIntoView({ behavior: "smooth" });
      }
    },
    { strategy: "document-ready" },
  );

  useOnDocument(
    "keydown",
    $((e) => {
      if (e.key === "Escape") {
        const aiModal = document.getElementById("ai-modal");
        if (aiModal) {
          aiModal.setAttribute("aria-hidden", "true");
          modal.value = false;
        }
      }
    }),
  );

  const isActive = useResource$(async () => {
    const res = await fetch(`${apiURL}/copilot/settings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const {status} = await res.json();
    return status;
  });

  return (
    <div
      id="ai-modal"
      tabIndex={-1}
      aria-hidden="true"
      class="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
    >
      <div class="relative max-h-full w-full max-w-2xl p-4">
        <div class="relative flex flex-col rounded-lg border bg-white shadow dark:border-gray-600 dark:bg-gray-700">
          <Resource
            value={isActive}
            onResolved={(value) =>
              value ? (
                <div>
                  <Title />
                  <Chat$
                    userData={userData}
                    loading={loading}
                    apiURL={apiURL}
                    accessToken={accessToken}
                  />
                </div>
              ) : (
                <div>
                  <Header />
                  <div class="flex flex-col items-center space-y-4 px-4 py-8">
                    <ImgRobot width="150" height="150" />
                    <h1 class="text-3xl font-bold text-gray-800 dark:text-white">
                      {i18n("ai.aiChatDisabled")}
                    </h1>
                    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      {i18n("ai.aiChatDisabledDesc")}
                    </p>
                  </div>
                </div>
              )
            }
          />
        </div>
      </div>
    </div>
  );
});
