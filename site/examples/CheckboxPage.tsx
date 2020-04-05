import React, { useState } from 'react';
import { Checkbox } from 'neutrino-ui';
import {Example} from './Example';


const exampleSimple = `
import { Checkbox } from 'neutrino-ui';
const [check, setCheck] = useState(true);
<Checkbox onChangeHandler={(v) => setCheck(v)} checked={check}>
  Simple Checkbox
</Checkbox>
`.trim();

const exampleDefault = `
import { Checkbox } from 'neutrino-ui';
const [check, setCheck] = useState(true);
<Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default">
  Default Checkbox
</Checkbox>
`.trim();

const exampleSecondary = `
import { Checkbox } from 'neutrino-ui';
const [check, setCheck] = useState(true);
<Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="secondary">
  Secondary Checkbox
</Checkbox>
`.trim();

export function CheckboxPage() {
    const [check, setCheck] = useState(true);
    return (
        <div>
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check}>
                Simple Checkbox
            </Checkbox>
            <Example code={exampleSimple} />
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="default">
                Default Checkbox
            </Checkbox>
            <Example code={exampleDefault}/>
            <Checkbox onChangeHandler={(v) => setCheck(v)} checked={check} variant="secondary">
                Secondary Checkbox
            </Checkbox>
            <Example code={exampleSecondary}/>
        </div>
    );
}
