export default function header({onChangeConfig}) {
    return (
        <header className="sapper-header">
            <h1>Sapper Game</h1>
            <button type="button" onClick={onChangeConfig}>
                Change config
            </button>
        </header>
    );
}
