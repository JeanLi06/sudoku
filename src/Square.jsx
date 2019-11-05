import React, {Component} from "react";

class Square extends Component {
    render() {
        const square_index = this.props.square_index;
        const square_value = this.props.square_value;
        return (
            <span>
                        <button className="square" id={square_index}
                                onClick={() => this.getCoordonatesOfClickedSquare(square_index)}>
                    {square_value}
                    </button>
                    </span>)
    }
}

export default Square;