import { GameStateEvent } from "../../presentation/event/game-state";

export const makeGameStateEvent = () => {
  return new GameStateEvent();
};
