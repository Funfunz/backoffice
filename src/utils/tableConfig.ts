import { ITable, IColumn } from "services/api/models/table";

export const emptyTableConfig: ITable = {
  name: '',
  columns: [],
  layout: {
    label: '',
  },
};

export const emptyColumnConfig: IColumn = {
  name: '',
  searchable: false,
  visible: {
    list: false,
    detail: false,
    relation: false,
  },
  model: {
    type: '',
    allowNull: true,
  },
  layout: {},
}