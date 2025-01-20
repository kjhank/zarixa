import { PopoutPlayer } from './components/PopoutPlayer';

const handleAudio = (node: HTMLAnchorElement) => {
  if (!node.href) return;

  const player = new PopoutPlayer(node.href, node?.closest('.accordion-item')?.querySelector('h3')?.textContent);

  document.body.appendChild(player);

  player.play();
};

const handleClick = (event: MouseEvent) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;

  event.preventDefault();

  const { dataset } = event.target;

  if (dataset.interaction === 'play-audio') {
    document.querySelectorAll<PopoutPlayer>('popout-player').forEach((player) => player.destroy());

    handleAudio(event.target);
  }
};

const setupPlayer = (node: HTMLAnchorElement) => {
  node.addEventListener('click', handleClick);
};

export const initPlayers = () => {
  const audioLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-interaction="play-audio"]'));

  audioLinks.forEach(setupPlayer);
};
