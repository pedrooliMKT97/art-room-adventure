export type ModalType = 'computer' | 'poster' | 'bookshelf' | 'phone' | 'certificate' | null;

export interface GameState {
  x: number;
  y: number;
  dir: 'up' | 'down' | 'left' | 'right';
  moving: boolean;
  frame: number;
  blinkTimer: number;
  blinking: boolean;
  animTimer: number;
  keys: { w: boolean; a: boolean; s: boolean; d: boolean };
  curtainOffset: number;
  cpuBlink: boolean;
  cpuBlinkTimer: number;
}

export interface DrawRoomParams {
  scale: number;
  tile: number;
  cols: number;
  rows: number;
  ts: number;
  state: GameState;
}

export interface DrawCharParams {
  x: number;
  y: number;
  scale: number;
  tile: number;
  dir: GameState['dir'];
  frame: number;
  blinking: boolean;
}
