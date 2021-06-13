import React from 'react';
import PropTypes from 'prop-types';
import AppMinMax from '~c/inputs/minmax';

import cartModel from '~s/cart.js';
import router from '~s/router.js';
import { Button, Table } from 'react-bootstrap';
import {observer} from 'mobx-react';

@observer class Cart extends React.Component{
    render(){
        let productsRows = cartModel.products.map((product, i) => {
            return (
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>
                        <AppMinMax min={1} 
                                   max={product.rest} 
                                   cnt={product.current} 
                                   onChange={(cnt) => cartModel.change(i, cnt)}
                        />
                    </td>
                    <td>{product.price * product.current}</td>
                    <td>
                        <Button variant="danger" onClick={() => cartModel.remove(i)}>
                            X
                        </Button>
                    </td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Cart</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Price</td>
                            <td>Count</td>
                            <td>Total</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {productsRows}
                    </tbody>
                </Table>
                <h3>Total: {cartModel.total}</h3>
                <hr/>
                <Button variant="success" onClick={() => router.moveTo('order')}>Send</Button>
            </div>
        );
    }
}

export default Cart;