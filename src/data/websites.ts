export type UselessWebsite = {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  verified: boolean;
};

// Every destination returned HTTP 200 over HTTPS on 2026-10-05. URLs are kept
// here so the homepage and discovery flow share one curated source of truth.
export const websites: UselessWebsite[] = [
  { id: 'cat-bounce', name: 'Cat Bounce', url: 'https://cat-bounce.com/', description: 'Throw a few cats around and let a tiny physics playground do its thing.', category: 'Silly animals', verified: true },
  { id: 'long-doge-challenge', name: 'The Long Doge Challenge', url: 'https://longdogechallenge.com/', description: 'Click your way along a very long doge and collect the wows.', category: 'Internet nostalgia', verified: true },
  { id: 'mondrian-and-me', name: 'Mondrian and Me', url: 'https://mondrianandme.com/', description: 'Make a little abstract color-block art by dragging lines around.', category: 'Creative', verified: true },
  { id: 'potato-or-tomato', name: 'Potato or Tomato', url: 'https://potatoortomato.com/', description: 'Face an urgent question: potato or tomato?', category: 'Food for thought', verified: true },
  { id: 'heeeeeeeey', name: 'HEEEEEEEY!', url: 'https://heeeeeeeey.com/', description: 'Press play on one extremely enthusiastic internet hello.', category: 'Music & sounds', verified: true },
  { id: 'rrr-ggg-bbb', name: 'RRR GGG BBB', url: 'https://www.rrrgggbbb.com/', description: 'Spend a moment with three colors that really do not need a job.', category: 'Visual oddities', verified: true },
  { id: 'pointer-pointer', name: 'Pointer Pointer', url: 'https://pointerpointer.com/', description: 'Move your pointer and a stranger will point right at it.', category: 'Interactive', verified: true },
  { id: 'eel-slap', name: 'Eel Slap', url: 'https://eelslap.com/', description: 'Drag to deliver a very silly virtual eel slap.', category: 'Silly animals', verified: true },
  { id: 'koalas-to-the-max', name: 'Koalas to the Max', url: 'https://koalastothemax.com/', description: 'Split circles until a hidden koala finally appears.', category: 'Interactive', verified: true },
  { id: 'paper-toilet', name: 'Paper Toilet', url: 'https://papertoilet.com/', description: 'Unroll an unusually committed amount of digital toilet paper.', category: 'Useless', verified: true },
  { id: 'falling-falling', name: 'Falling Falling', url: 'https://www.fallingfalling.com/', description: 'Watch an endless cascade of colorful shapes tumble by.', category: 'Visual oddities', verified: true },
  { id: 'omfgdogs', name: 'OMFG Dogs', url: 'https://www.omfgdogs.com/', description: 'Let a pack of tiny animated dogs run forever.', category: 'Silly animals', verified: true },
  { id: 'bored-button', name: 'Bored Button', url: 'https://www.boredbutton.com/', description: 'Press a button to tumble into a new little time-waster.', category: 'Time-wasters', verified: true },
  { id: 'windows-93', name: 'Windows 93', url: 'https://www.windows93.net/', description: 'Explore a gloriously strange, fake retro computer desktop.', category: 'Internet nostalgia', verified: true },
  { id: 'one-square-minesweeper', name: 'One Square Minesweeper', url: 'https://onesquareminesweeper.com/', description: 'Play a minesweeper game that has exactly one square.', category: 'Mini games', verified: true },
  { id: 'weave-silk', name: 'Silk', url: 'https://weavesilk.com/', description: 'Draw glowing, mirrored patterns with a few drags.', category: 'Creative', verified: true },
  { id: 'patatap', name: 'Patatap', url: 'https://patatap.com/', description: 'Tap keys to make colorful shapes and musical sounds.', category: 'Interactive', verified: true },
  { id: 'this-is-sand', name: 'This Is Sand', url: 'https://thisissand.com/', description: 'Pour digital grains of sand into a tiny colorful landscape.', category: 'Creative', verified: true },
  { id: 'neal-fun', name: 'Neal.fun', url: 'https://neal.fun/', description: 'A collection of curious mini games and internet experiments.', category: 'Internet experiments', verified: true },
  { id: 'make-everything-ok', name: 'Make Everything OK', url: 'https://make-everything-ok.com/', description: 'Press the magic button. Everything will be fine. Probably.', category: 'Useless', verified: true },
  { id: 'instant-rimshot', name: 'Instant Rimshot', url: 'https://instantrimshot.com/', description: 'Add a perfectly timed ba-dum-tss to your least funny joke.', category: 'Music & sounds', verified: true },
  { id: 'nyan-cat', name: 'Nyan Cat', url: 'https://www.nyan.cat/', description: 'A pop-tart cat, a rainbow, and an extremely persistent song.', category: 'Meme', verified: true },
  { id: 'rainy-mood', name: 'Rainy Mood', url: 'https://www.rainymood.com/', description: 'Turn on a window’s worth of rain, whether or not it is raining.', category: 'Music & sounds', verified: true },
  { id: 'blank', name: 'Blank', url: 'https://blank.org/', description: 'A website that takes minimalism all the way to the end.', category: 'Useless', verified: true },
  { id: 'hooooooooo', name: 'HOOOOOOOOOO!', url: 'https://hooooooooo.com/', description: 'A tiny celebration of one very long “Hooooo!”.', category: 'Useless', verified: true },
  { id: 'move-now-think-later', name: 'Move Now Think Later', url: 'https://movenowthinklater.com/', description: 'Watch an extremely speedy game of checkers unfold.', category: 'Visual oddities', verified: true },
  { id: 'random-colour', name: 'Random Colour', url: 'https://randomcolour.com/', description: 'See a color. Refresh your expectations. See another color.', category: 'Visual oddities', verified: true },
  { id: 'invisible-cow', name: 'Find the Invisible Cow', url: 'https://findtheinvisiblecow.com/', description: 'Follow the increasingly loud hints to find a hidden cow.', category: 'Mini games', verified: true },
  { id: 'sometimes-red-sometimes-blue', name: 'Sometimes Red, Sometimes Blue', url: 'https://www.sometimesredsometimesblue.com/', description: 'Wonder which color it will be. Then find out.', category: 'Visual oddities', verified: true },
  { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', url: 'https://www.rock-paper-scissors-game.com/', description: 'Settle a timeless dispute with the classic hand game.', category: 'Mini games', verified: true },
  { id: 'end-of-the-internet', name: 'End of the Internet', url: 'https://hmpg.net/', description: 'Congratulations: you may have reached the end of the internet.', category: 'Internet nostalgia', verified: true },
  { id: 'leave-page', name: 'Leave Page', url: 'https://leavepage.aurelitec.com/', description: 'Try to leave the page and see how it reacts.', category: 'Interactive', verified: true },
  { id: 'checkbox-race', name: 'Checkbox Race', url: 'https://checkboxrace.com/', description: 'Race a checkbox across a very tiny track.', category: 'Mini games', verified: true },
  { id: 'ducks-are-the-best', name: 'Ducks Are the Best', url: 'https://ducksarethebest.com/', description: 'A simple, persuasive tribute to ducks.', category: 'Silly animals', verified: true },
  { id: 'zoomquilt', name: 'Zoomquilt', url: 'https://zoomquilt.org/', description: 'Stare into an endlessly zooming illustrated world.', category: 'Visual oddities', verified: true },
  { id: 'zoomquilt-2', name: 'Zoomquilt 2', url: 'https://zoomquilt2.com/', description: 'Take another infinite trip through collaborative art.', category: 'Visual oddities', verified: true },
  { id: 'scream-into-the-void', name: 'Scream Into the Void', url: 'https://screamintothevoid.com/', description: 'Type your thoughts into a void that keeps them to itself.', category: 'Useless', verified: true },
  { id: 'the-zen-zone', name: 'The Zen Zone', url: 'https://thezen.zone/', description: 'Take a tiny, quiet detour into a little digital calm.', category: 'Internet experiments', verified: true },
  { id: 'click-click-click', name: 'Click Click Click', url: 'https://clickclickclick.click/', description: 'Click around while the page narrates your every move.', category: 'Interactive', verified: true },
  { id: 'draw-a-stickman', name: 'Draw a Stickman', url: 'https://drawastickman.com/', description: 'Draw a stick figure and send it on an illustrated adventure.', category: 'Mini games', verified: true },
  { id: 'camerons-world', name: 'Cameron’s World', url: 'https://www.cameronsworld.net/', description: 'Wander through a collage of wonderfully chaotic old web pages.', category: 'Internet nostalgia', verified: true },
  { id: 'people-in-space', name: 'How Many People Are in Space Right Now?', url: 'https://www.howmanypeopleareinspacerightnow.com/', description: 'Check the current number of humans floating above Earth.', category: 'Internet experiments', verified: true },
  { id: 'passive-aggressive-passwords', name: 'Passive Aggressive Passwords', url: 'https://trypap.com/', description: 'Get a sarcastic review of your password ideas.', category: 'Funny', verified: true },
  { id: 'wrongulator', name: 'Wrongulator', url: 'https://wrongulator.com/', description: 'Use a calculator that is proudly wrong on purpose.', category: 'Funny', verified: true },
  { id: 'dvd-screensaver-maker', name: 'DVD Screensaver Maker', url: 'https://www.dvdscreensavermaker.com/', description: 'Watch a bouncing DVD logo or make one of your own.', category: 'Internet nostalgia', verified: true },
  { id: 'pug-in-a-rug', name: 'The Pug In A Rug', url: 'https://puginarug.com/', description: 'Click to reveal a pug tucked inside a very good rug.', category: 'Silly animals', verified: true },
  { id: 'bury-me-with-my-money', name: 'Bury Me With My Money', url: 'https://burymewithmymoney.com/', description: 'A tiny, emphatic tribute to one very specific request.', category: 'Meme', verified: true },
  { id: 'please-like', name: 'Please Like', url: 'https://pleaselike.com/', description: 'A colorful little meditation on the humble like button.', category: 'Visual oddities', verified: true },
  { id: 'bouncing-dvd-logo', name: 'Bouncing DVD Logo', url: 'https://www.bouncingdvdlogo.com/', description: 'Wait for the logo to hit the corner. You know you want to.', category: 'Internet nostalgia', verified: true },
  { id: 'qwop', name: 'QWOP', url: 'https://www.foddy.net/legacy/Athletics.html', description: 'Attempt to run using only four very uncooperative keys.', category: 'Mini games', verified: true },
];
