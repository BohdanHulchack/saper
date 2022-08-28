export function generateCells(width, height) {
    return [...Array(width * height)]
        .fill(null)
        .map(() => ({
            state: "blank",// mine
            closeCount: 0,
            covered: true,
        }))
}

export function addMines(rawCells, {width, height, minesCount}) {
    const mineFields = new Set();
    const cellsCount = width * height;
    const cellsWithMines = [...rawCells];

    if (minesCount > cellsCount) {
        return rawCells;
    }

    do {
        const mineFieldIndex = Math.floor(Math.random() * cellsCount);

        if (!mineFields.has(mineFieldIndex)) {
            mineFields.add(mineFieldIndex);

            if  (cellsWithMines[mineFieldIndex]) {
                cellsWithMines[mineFieldIndex] = {
                    ...cellsWithMines[mineFieldIndex],
                    state: "mine",
                }
            }
        }
    } while (mineFields.size < minesCount);

    return {
        cellsWithMines,
        mineFields,
    }
}

function getIdsToCheckAround(cellIndex, cellsCount, width) {
    const leftWing = [
        cellIndex - width - 1,
        cellIndex - 1,
        cellIndex + width - 1
    ];
    const centerWing = [
        cellIndex - width,
        cellIndex + width
    ];
    const rightWing = [
        cellIndex + width + 1,
        cellIndex + 1,
        cellIndex - width + 1
    ];

    let result = [].concat(rightWing, centerWing, leftWing);

    if ((cellIndex + 1) % width === 0 && cellIndex !== 0) {
        result = [].concat(leftWing, centerWing);
    } else if((cellIndex + 1) % width === 1 || cellIndex === 0) {
        result = [].concat(rightWing, centerWing);
    }

    return result.filter((item) => {
        if (item === 0) {
            return true;
        } else {
            return item > 0 && item <= cellsCount - 1;
        }
    });
}


export function addCounts(cellsWithMines, mineFields, options) {
    const cellsCount = options.width * options.height;
    const fieldCells = [...cellsWithMines];

    Array.from(mineFields).forEach((mineIndex) => {
        getIdsToCheckAround(mineIndex, cellsCount, options.width)
            .filter((item) => fieldCells[item].state !== "mine")
            .forEach((countCellIndex) => fieldCells[countCellIndex].closeCount++);
    })

    return fieldCells;
}

export function revealCell(cellIndex, oldCells, options, setModal) {
    const cells = [...oldCells];
    const clickedCell = cells[cellIndex];

    clickedCell.covered = false;

    if (clickedCell.state === "blank" && clickedCell.closeCount === 0) {
        checkSurroundingCells(cellIndex, cells, options);
    }

    if (clickedCell.state === "mine") {
        setModal("gameOver");
    }

    return cells;
}

function checkSurroundingCells(cellIndex, cells, options) {
    const {width, height} = options;
    const cellsCount = width * height;
    const surroundingCells = getIdsToCheckAround(cellIndex, cellsCount, width)

    surroundingCells.forEach((closeCellIndex) => {
        const closeCell = cells[closeCellIndex];
        if (closeCell.state === "blank" && closeCell.closeCount === 0 && closeCell.covered) {
            closeCell.covered = false;
            checkSurroundingCells(closeCellIndex, cells, options);
        } else if (closeCell.state === "blank" && closeCell.closeCount > 0 && closeCell.covered) {
            closeCell.covered = false;
        }
    })
}

export function generateNewGameBoard(cells, options, setCells) {
    if  (!cells.length) {
        const rawCells = generateCells(options.width, options.height);
        const {cellsWithMines, mineFields} = addMines(rawCells, options);
        const readyMineField = addCounts(cellsWithMines, mineFields, options);
        setCells(readyMineField);
    }
}