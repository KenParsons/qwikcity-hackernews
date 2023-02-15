import { component$, useStore, Slot, useSignal } from '@builder.io/qwik';

export default component$(() => {
    const open = useSignal(true);
    return (
        <>
            <div class={{ "toggle": true, "open": open.value }}>
                <a onClick$={() => open.value = !open.value}>
                    {open.value ? "[-]" : "[+] collapsed"}
                </a>
            </div>
            {open.value && (
                <ul class="comment-children">
                    <Slot />
                </ul>
            )}
        </>
    );
});