type SetupTabs = (tabslist: Element, index: number) => void;

export const initTabs = () => {
  const tabsWrapper = document.querySelectorAll('.tabs');

  const setupTabs: SetupTabs = (tabslist) => {
    const tabs = Array.from(tabslist.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabslist.querySelectorAll('[role="tabpanel"]'));

    const handleTabChange = ({ target }: Event) => {
      if (!(target instanceof Element)) return;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, tabId] = target.id.split('tab-');
      const panelIndex = Number(tabId) - 1;

      tabs.forEach((tab) => tab.setAttribute('aria-selected', 'false'));
      target.setAttribute('aria-selected', 'true');

      panels.forEach((panel) => panel.classList.remove('tab-panel-active'));

      if (panels.at(panelIndex)) {
        panels.at(panelIndex)?.classList.add('tab-panel-active');
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener('click', handleTabChange);
    });
  };

  tabsWrapper.forEach(setupTabs);
};
