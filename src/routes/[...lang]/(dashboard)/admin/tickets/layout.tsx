import { Slot, component$ } from "@builder.io/qwik";


export default component$(() => {
  return (
    <>
      <Slot /> {/* <== This is where the route will be inserted */}
    </>
  );
});
