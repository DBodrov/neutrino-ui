import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ButtonPage, TypographyPage, InputPage, MaskInputPage } from './examples';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <span>Documentation site. Coming soon...</span>
            </Route>
            <Route path="/button">
                <ButtonPage />
            </Route>
            <Route path="/typography">
                <TypographyPage />
            </Route>
            <Route path="/input">
                <InputPage />
            </Route>
            <Route path="/maskinput">
                <MaskInputPage />
            </Route>
        </Switch>
    );
}
