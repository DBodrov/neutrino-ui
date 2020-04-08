import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ButtonPage, TypographyPage, InputPage, MaskInputPage, CheckboxPage, InputNumberPage } from './examples';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/">
                <span>Choose component from left sidebar</span>
            </Route>
            <Route path="/button">
                <ButtonPage />
            </Route>
            <Route path="/checkbox">
                <CheckboxPage />
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
            <Route path="/inputnumber">
                <InputNumberPage />
            </Route>
        </Switch>
    );
}
