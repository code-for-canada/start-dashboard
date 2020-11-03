import React from 'react'
import { addDecorator } from '@storybook/react'
import { MemoryRouter } from 'react-router'

// We rely on a customized bootstrap, so this is a catch until we move stlying into components.
// Source: https://github.com/storybookjs/storybook/issues/25#issuecomment-679156506
import 'assets/scss/main.scss'

// Source: https://stackoverflow.com/a/60583791/504018
addDecorator(story => (
  <MemoryRouter initialEntries={['/']}>
    {story()}
  </MemoryRouter>
))

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}
