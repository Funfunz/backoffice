import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Table, ITableProps } from 'components/table';

import { createMemoryHistory } from "history";
import { Router } from "react-router";
import { Route } from 'react-router-dom';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    columns: {
      control: 'object'
    },
    tableData: {
      control: 'object'
    },
    loadingTableData: {
      control: 'boolean'
    },
  }
} as Meta

const Template: Story<ITableProps> = (args) => {
  const history = createMemoryHistory();
  const url = '/table-storybook';
  history.push(url);
  return (
      <Router history={history}>
          <Route path={'/:tableName'} render={() => <Table {...args} />}></Route>
      </Router>
  );

  
} 

export const Default = Template.bind({})
Default.args = {
  columns: [
    {name: 'col1', label: 'Col1'},
    {name: 'col2', label: 'Col2'},
    {name: 'col3', label: 'Col3'} 
  ],
  tableData: [
    {'col1': 1, 'col2': 2, 'col3': 3},
    {'col1': 1, 'col2': 2, 'col3': 3},
  ]
}