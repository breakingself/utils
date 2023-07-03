import { CellType } from './cell-type';

const FORMULA_COLUMN_TYPES_MAP = {
  [CellType.FORMULA]: true,
  [CellType.LINK_FORMULA]: true,
};

export {
  FORMULA_COLUMN_TYPES_MAP,
};
