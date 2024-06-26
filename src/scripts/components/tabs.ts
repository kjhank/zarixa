/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
type SetupTabs = (tabslist: Element, index: number) => void;

const navKeys = ['ArrowRight', 'ArrowLeft'];

const resetTabs = (tabs: Array<Element>, panels: Array<Element>) => {
  tabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));

  panels.forEach((panel) => panel.classList.remove('tab-panel-active'));
};

const setupTabs: SetupTabs = (tabslist) => {
  const tabs = Array.from(tabslist.querySelectorAll('[role="tab"]'));
  const panels = Array.from(tabslist.querySelectorAll('[role="tabpanel"]'));

  const handleTabChange = ({ target }: Event) => {
    if (!(target instanceof Element)) return;

    const [_, tabId] = target.id.split('tab-');
    const panelIndex = Number(tabId);

    resetTabs(tabs, panels);

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

    const panelIndex = Number(tabId);
    const isFirst = panelIndex === 0;
    const isLast = panelIndex === tabs.length - 1;

    if (key === 'ArrowLeft') {
      if (!isFirst) {
        resetTabs(tabs, panels);
        tabs.at(panelIndex - 1)?.setAttribute('aria-selected', 'true');
        panels.at(panelIndex - 1)?.classList.add('tab-panel-active');
      }
    }

    if (key === 'ArrowRight') {
      if (!isLast) {
        resetTabs(tabs, panels);
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

export const initTabs = () => {
  const tabsWrapper = document.querySelectorAll('.tabs');

  tabsWrapper.forEach(setupTabs);
};
