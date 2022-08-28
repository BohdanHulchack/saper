import ConfigPopUp from "./configPoup";

export default function popup({modalType, onRetry, onStart, onChangeConfig}) {
    if (modalType === "none") {
        return null;
    }

    if (modalType === "success") {
        return (
            <div className="sapper-popup">
                <h2>Wow, great job! You win</h2>
                <button type="button" onClick={() => onRetry(true)}>
                    Try again
                </button>
                <button type="button" onClick={onChangeConfig}>
                    Change config
                </button>
            </div>
        );
    }

    if (modalType === "gameOver") {
        return (
            <div className="sapper-popup">
                <h2>Your, dead ;-(</h2>
                <p>
                    Minesweeper makes mistakes 2 times,
                    the first time when choosing a profession,
                    the second time at work.
                </p>
                <button type="button" onClick={() => onRetry(true)}>
                    Head to next reincarnation
                </button>
            </div>
        );
    }

    if (modalType === "newGame") {
        return <ConfigPopUp onStart={onStart}/>
    }
}
