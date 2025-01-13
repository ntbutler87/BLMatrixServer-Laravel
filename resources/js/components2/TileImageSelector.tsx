import { useState } from "react";
import { ChangeEventHandler } from "react";

interface Props {
    name: string;
    className?: string;
    defaultFile: string|null;
    onChange: ChangeEventHandler<HTMLSelectElement>;
}

export default function TileImageSelector({
        className = '',
        name,
        defaultFile,
        onChange
    }: Props) {

    return (
        <select id={name} name={name} onChange={onChange} className={className} defaultValue={defaultFile ?? undefined}>
            <option value="Auto">Auto</option>
            <option value="Art">Art</option>
            <option value="Camera">Camera</option>
            <option value="Care">Care</option>
            <option value="Checked">Checked</option>
            <option value="Church">Church</option>
            <option value="Guitar">Guitar</option>
            <option value="Hdmi">Hdmi</option>
            <option value="Input">Input</option>
            <option value="Microphone">Microphone</option>
            <option value="Projector">Projector</option>
            <option value="Screen">Screen</option>
            <option value="Setting">Setting</option>
            <option value="Stop">Stop</option>
            <option value="Stream">Stream</option>
            <option value="Tv">Tv</option>
            <option value="Tv2">Tv2</option>
            <option value="Winner">Winner</option>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four">Four</option>
            <option value="Five">Five</option>
            <option value="Six">Six</option>
            <option value="Seven">Seven</option>
            <option value="Eight">Eight</option>
        </select>
    );
}
