import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Loading, ILoadingProps } from 'components/loading';

export default {
  title: 'Components/Loading',
  component: Loading,
} as Meta

const Template: Story<ILoadingProps> = (args) => <Loading {...args} />

export const Default = Template.bind({})
Default.args = {
  
}