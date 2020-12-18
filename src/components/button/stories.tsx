import React from 'react'
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0'

import {Button, IButtonProps } from 'components/button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    label: {
      control: 'text'
    },
    prefix: {
      control: 'text'
    },
    suffix: {
      control: 'text'
    },
  }
} as Meta

const Template: Story<IButtonProps> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Button'
}

export const Danger = Template.bind({})
Danger.args = {
  label: 'Button',
  color: 'danger'
}

export const Rounded = Template.bind({})
Rounded.args = {
  label: 'Button',
  color: 'danger',
  rounded: true
}