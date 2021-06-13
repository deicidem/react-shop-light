import React from 'react';

import cartModel from '~s/cart.js';
import {observer} from 'mobx-react';
@observer class Result extends React.Component{
    render(){
        return (
            <div>
                <h2>Congratulations!</h2>
                <p><strong>Total: {cartModel.total}</strong></p>
            </div>
        )
    }
}
export default Result;