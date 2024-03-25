import './styles/style.css';
import { LogoComponent } from './scripts/components/logo';
import { HeadComponent } from './scripts/components/ass-head';
import { CaretComponent } from './scripts/components/caret';
import { initTabs } from './scripts/components/tabs';
import { ArrowComponent } from './scripts/components/arrow';
import { initAss } from './scripts/components/ass';
import { initHeaderScrolling } from './header';
import { initScrollers } from './scrollers';
import { initTriggers } from './triggers';
import { initDialog } from './dialog';

customElements.define('product-logo', LogoComponent);
customElements.define('ass-head', HeadComponent);
customElements.define('caret-icon', CaretComponent);
customElements.define('arrow-icon', ArrowComponent);

initTabs();
initAss();
initHeaderScrolling();
initScrollers();
initTriggers();
initDialog();
