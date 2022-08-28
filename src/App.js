import {useState, useEffect} from "react";
import './App.css';
import Game from "./components/game";
import Header from "./components/header";
import PopUp from "./components/popup";

import {revealCell, generateNewGameBoard} from "./utils/cell";
import {checkSuccess} from "./utils/game";

function App() {
    let [options, setOptions] = useState({
        width: 10,
        height: 10,
        minesCount: 10,
        totalCells: 100,
    });
    let [cells, setCells] = useState([]);
    let [openCells, setOpenCellsCount] = useState(0);
    let [modalType, setModal] = useState("none");

    useEffect(() => {
        generateNewGameBoard(cells, options, setCells);
    }, [cells, cells.length, options]);

    const onClick = (index) => {
        setCells(revealCell(index, cells, options, setModal));

        const {width, height} = options;
        const coveredCells = cells.filter((cell) => cell.covered);
        setOpenCellsCount(width * height - coveredCells.length);
    }
    const wipeData = () => {
        setModal("none");
        setCells([]);
        setOpenCellsCount(0);
    }
    const onRetry = (isWipe) => {
        if (isWipe) wipeData();
        generateNewGameBoard(cells, options, setCells);
    };
    const onStart = (config) => {
        wipeData();
        setOptions({
            ...config,
            totalCells: config.width * config.height,
        });
        onRetry(false);
    };
    const onChangeConfig = () => {
        wipeData();
        setModal("newGame");
    };

    checkSuccess(options, openCells, modalType, setModal);

    return (
        <>
            <Header onChangeConfig={onChangeConfig}/>
            <main className="sapper-bg">
                <Game
                    cells={cells}
                    width={options.width}
                    onClick={onClick}
                />
                <PopUp
                    modalType={modalType}
                    onRetry={onRetry}
                    onStart={onStart}
                    onChangeConfig={onChangeConfig}
                />
            </main>
        </>
    );
}

export default App;
