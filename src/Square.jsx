import React, {Component} from "react";

class Square extends Component {
    render() {
        const {square_index, square_value, getCoordonates} = this.props;
        return (
            <span>
                <button className="square"
                        id={square_index}
                        onClick={() => getCoordonates(square_index)}>
                {square_value}
                </button>
            </span>
        );
    }
}

export default Square;