export interface WordmarkLayout {
  /** Number of brick columns (a brick is 2 cells wide, 1 cell tall). */
  cols: number;
  /** Number of brick rows. */
  rows: number;
  /** Brick centres in cell units: x in columns (odd rows offset by 0.5), y in rows from the top. */
  bricks: [number, number][];
}
