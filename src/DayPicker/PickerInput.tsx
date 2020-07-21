import React from 'react';
import { useDayPicker } from './DayPickerProvider';

export function PickerInput() {
    const { formatConfig } = useDayPicker();
    // console.log(formatConfig.inputs.e
    const renderCell = () => {
        const cfgEntries = Array.from(formatConfig.inputs.entries());
        const cellCount = formatConfig.inputs.size;
        return cfgEntries.map((cfg, i) => {
            return (
                <>
                    <input type="tel" key={cfg[0]} maxLength={cfg[1].length} />
                    {i < cellCount - 1 && <span>{formatConfig.delimiter}</span>}
                </>
            );
        });
    };

    return <div>{renderCell()}</div>;
}
