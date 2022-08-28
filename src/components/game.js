import Cell from "./cell";

export default function game({cells = [], width = 10, onClick}) {

    const canvasWidthStyles = {width: width * 50};
    return (
        <div className="sapper-canvas" style={canvasWidthStyles}>
            {cells.map((element, index) => (
                <Cell
                    key={`${index * 20}`}
                    element={element}
                    index={index}
                    onClick={onClick}
                />
            ))}
        </div>
    );
}
