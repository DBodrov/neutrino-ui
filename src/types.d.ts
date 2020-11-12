/// <reference types="@emotion/react/types/css-prop" />
import '@emotion/react'
import {ITheme} from './Themes'


declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
