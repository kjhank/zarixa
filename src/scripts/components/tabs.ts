/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
type SetupTabs = (tabslist: Element, index: number) => void;

const navKeys = ['ArrowRight', 'ArrowLeft'];

export const initTabs = () => {
  const tabsWrapper = document.querySelectorAll('.tabs');

  const setupTabs: SetupTabs = (tabslist) => {
    const tabs = Array.from(tabslist.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabslist.querySelectorAll('[role="tabpanel"]'));

    const resetTabs = () => {
      tabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));

      panels.forEach((panel) => panel.classList.remove('tab-panel-active'));
    };

    const handleTabChange = ({ target }: Event) => {
      if (!(target instanceof Element)) return;

      const [_, tabId] = target.id.split('tab-');
      const panelIndex = Number(tabId) - 1;

      resetTabs();

      target.setAttribute('aria-selected', 'true');

      if (panels.at(panelIndex)) {
        panels.at(panelIndex)?.classList.add('tab-panel-active');
      }
    };

    const initKeyboard = (event: Event) => {
      if (!(event instanceof KeyboardEvent)) return;

      const { key } = event;

      if (!navKeys.includes(key)) return;

      const activeTab = tabs.find((tab) => tab.getAttribute('aria-selected') === 'true');

      const [_, tabId] = activeTab?.id.split('tab-') ?? [];

      const panelIndex = Number(tabId) - 1;
      const isFirst = panelIndex === 0;
      const isLast = panelIndex === tabs.length - 1;

      if (key === 'ArrowLeft') {
        if (!isFirst) {
          resetTabs();
          tabs.at(panelIndex - 1)?.setAttribute('aria-selected', 'true');
          panels.at(panelIndex - 1)?.classList.add('tab-panel-active');
        }
      }

      if (key === 'ArrowRight') {
        if (!isLast) {
          resetTabs();
          tabs.at(panelIndex + 1)?.setAttribute('aria-selected', 'true');
          panels.at(panelIndex + 1)?.classList.add('tab-panel-active');
        }
      }
    };

    const handleTabsFocus = (event: Event) => {
      if (!event.target) return;

      if (event.type === 'focusin') {
        window.addEventListener('keydown', initKeyboard);
      }

      if (event.type === 'focusout') {
        window.removeEventListener('keydown', initKeyboard);
      }
    };

    tabslist.addEventListener('focusin', handleTabsFocus);
    tabslist.addEventListener('focusout', handleTabsFocus);

    tabs.forEach((tab) => {
      tab.addEventListener('click', handleTabChange);
    });
  };

  tabsWrapper.forEach(setupTabs);
};
