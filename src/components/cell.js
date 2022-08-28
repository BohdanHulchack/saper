import {useState} from "react";

import Mine from "./cells/mine";
import CloseToMine from "./cells/closeToMine";
import Covered from "./cells/covered";

export default function cell(props) {
    const {
        element: {
            state,
            closeCount,
            covered,
        },
        index,
        onClick
    } = props;

    if  (covered) {
        return <Covered onClick={() => onClick(index)} />
    }

    if (state === "mine") {
      return <Mine />
    } else if (closeCount && state === "blank") {
        return <CloseToMine count={closeCount}/>
    } else {
        return <span className="cell cell-blank"/>
    }
}
