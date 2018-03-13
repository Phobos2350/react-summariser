import React, { Component } from 'react';
import { css } from 'react-emotion'

class NamedEnts extends Component {
    render() {
        return (
            <div className={ css`
                grid-column: 2;
                grid-row: 3;` 
            }>
                <h3>Named Entities</h3>
                <ul>
                {
                    this.props.data.map((ent, index) => 
                        <li key={ index }>{ ent }</li>
                    )
                }
                </ul>
            </div>
        )
    }
}

export default NamedEnts

