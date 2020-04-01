import { colors } from './colors';
export interface IShadows {
    lightRaised: ReturnType<typeof lightRaised>;
}

const lightRaised = (color: string) => ({
    boxShadow: `0 2px 6px 0 ${color}`
})

export const shadows: IShadows = {
    lightRaised: lightRaised(colors.grayColors.gray4)
}
