import { ITable, IColumn } from "services/api/models/table";

export const emptyTableConfig: ITable = {
  name: '',
  properties: [],
  layout: {
    label: '',
  },
};

export const emptyColumnConfig: IColumn = {
  name: '',
  searchable: false,
  model: {
    type: '',
    allowNull: true,
  },
  layout: {
    visible: {
      entityPage: false,
      detail: false,
      relation: false,
    }
  },
}