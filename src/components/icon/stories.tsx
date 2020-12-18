import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import { Icon,  IIconProps } from 'components/icon';

export default {
  title: 'Components/Icon',
  component: Icon,
 
} as Meta

const Template: Story<IIconProps> = (args) => (
  <span style={{backgroundColor: 'blue'}}>
   

    <Icon {...args} />
  </span>
)

export const Default = Template.bind({})
Default.args = {
  name: 'exclamation'
}