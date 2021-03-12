import { Engine } from './engine';
import { gameView } from './game-view';
import { Icon } from './icon';

export var engine: Engine;

function waitForWindowToLoad(): Promise<Event> {
  return new Promise<Event>((resolve, reject) => {
    window.addEventListener('load', ev => resolve(ev), { once: true });
  });
}

Promise
  .all([
    waitForWindowToLoad(),
    Icon.loadIcons(),
  ])
  .catch(reason => {
    console.error(reason);
  })
  .finally(startGame);

function startGame() {
  engine = new Engine({
    year: 1820,
    hand: [ '19h', '19g', '19a', '19f', '19c', '19i' ],
    players: [
      {
        suburb: {
          name: 'Markville',
          lots: [
            [ [], [/* */], [/* */], [/* */], [/* */], [] ],
            [ [], [     ], [     ], [     ], [     ], [] ],
            [ [], [     ], ['19g'], [     ], [     ], [] ],
            [ [], [     ], [     ], ['19c'], [     ], [] ],
            [ [], [     ], [     ], [     ], [     ], [] ],
            [ [], [/* */], [/* */], [/* */], [/* */], [] ],
          ],
        },
      },
    ]
  });
  document.body.appendChild(gameView.node);
}