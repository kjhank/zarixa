export const initAss = () => {
  const assWidgetInner = document.querySelector('[data-toggle="ass"]');

  const assButton = assWidgetInner?.querySelector('.utrenica-widget-btn');

  const assWrapper = assWidgetInner?.closest('.ass-widget-wrapper');

  if (!(assButton instanceof HTMLButtonElement)) return;

  const handleInteraction = (event: Event) => {
    if (!(event.target instanceof Element)) return;

    if (event instanceof KeyboardEvent) {
      if (event.code !== 'Enter' || !assWrapper?.hasAttribute('data-state')) return;
    }

    if (!event.target.closest('zarixa-external-chat-widget')) {
      assButton.click();
      assWrapper?.removeAttribute('data-state');
      // clearTimeout(timeoutId);
    }
  };

  assWidgetInner?.addEventListener('pointerdown', handleInteraction);
  assWidgetInner?.addEventListener('keyup', handleInteraction);
};
