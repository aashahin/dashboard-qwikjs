import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1>Admin tickets</h1>
    </div>
  );
});

export const head: DocumentHead = {
  // This will be used to resolve the <title> of the page
  title: 'About page',
  meta: [
    {
      name: 'description',
      content: 'This is the about page',
    },
    // Open graph
    {
      property: 'og:title',
      content: 'About page',
    },
    {
      property: 'og:description',
      content: 'This is the about page',
    },
  ],
  links: [
    {
      rel: 'canonical',
      href: 'https://example.com/about',
    },
  ],
};