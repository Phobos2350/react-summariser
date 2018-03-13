import React, { Component } from 'react';
import { css } from 'react-emotion'

class Summary extends Component {
    render() {
        return (
            <div className={ css`
                grid-column: 1 / 3;
                grid-row: 1;` 
            }>
                    <h3>Summary</h3>
                    { 
                        this.props.data.map((sentence, index) =>
                        <p key={ index }>{ sentence }</p>
                        )
                    }
                </div>
        )
    }
}

export default Summary