import styled from '@emotion/styled'
import {baseTheme} from 'neutrino-ui/Themes';

export const Aside = styled.aside`
    display: flex;
    flex-flow: column nowrap;
    max-width: 250px;
    width: 250px;
    height: 100%;
    border-right: 1px ${baseTheme.colors.pageElementsColors.border} solid;
`;
