import {useState} from "react";

export default function ConfigPopUp({onStart}) {
    let [config, setOptions] = useState({
        width: 10,
        height: 10,
        minesCount: 10
    });

    const onFieldChange = (event) => {
        const newValue = event.target.value;
        const fieldName = event.target.id;

        if (isNaN(parseInt(newValue))) {
            return;
        }

        const newConfig = {
            ...config,
            [fieldName]: parseInt(newValue)
        }
        setOptions(newConfig);
    }

    return (
        <div className="sapper-popup">
            <h2>Please, enter new config</h2>

            <label htmlFor="width">
                Field width
            </label>
            <input
                type="number"
                min={10}
                max={30}
                id="width"
                value={config.width}
                onChange={(event) => onFieldChange(event)}
            />

            <label htmlFor="height">Field height</label>
            <input
                type="number"
                min={10}
                max={30}
                id="height"
                value={config.height}
                onChange={(event) => onFieldChange(event)}
            />

            <label htmlFor="mines"> Mines </label>
            <input
                type="number"
                min={1}
                max={30}
                id="minesCount"
                value={config.minesCount}
                onChange={(event) => onFieldChange(event)}/>

            <button type="button" onClick={() => onStart(config)}>
                Start new game
            </button>
        </div>
    );
}




