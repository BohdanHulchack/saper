export function checkSuccess(options, openCells, modalType, setModal) {
    const {width, height, minesCount} = options;
    if (openCells === (width * height - minesCount) && modalType !== "success") {
        setModal("success");
    }
}