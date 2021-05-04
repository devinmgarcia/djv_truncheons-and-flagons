export const truncheonsHTML = () => {
  // TODO dont always render all three screens
  return /*html*/ `
  <article> ${introHTML()} </article>
  <article> ${setupHTML()} </article>
  <article> ${gameHTML()} </article>

    `;
};

export const introHTML = () => {
  return /*html*/ `
  <h1 class="logo">Truncheons & Flagons</h1>
  <button class="newGameButton">Set Up New Game</button>
  <div>
    <h3>Current Leaderboard</h3>
    <ul>
      <li> #1: The Flo Rida Fan Club -- 4 points</li>
      <li> #2: The Red Barons -- 2 points</li>
      <li> #3: REDACTED -- 0 points</li>
    </ul>
  </div>

  `;
};
export const setupHTML = () => {
  return /*html*/ ``;
};
export const gameHTML = () => {
  return /*html*/ ``;
};
