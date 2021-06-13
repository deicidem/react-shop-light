import React from 'react';
import PropTypes, { element } from 'prop-types';
import {Form, Button, Modal, ProgressBar, Table} from 'react-bootstrap';
import orderModel from '~s/order';
import cartModel from '~s/cart';
import { observer } from 'mobx-react';
import router from '~s/router';
import styles from './order.module.css'
@observer class Order extends React.Component{
    state = {
        showModal: false,
        progress: 0
    }

    show = () => {
        this.setState({showModal: true});
    }

    hide = () => {
        this.setState({showModal: false});
    }

    confirm = () => {
        this.hide();
        router.moveTo('result')
    }
    
    onChange = (name, value) => {
        let field = orderModel.data[name];
        orderModel.changeData(name, value);
        if (field.pattern.test(field.value)) {
            orderModel.changeStatus(name, true)
        } else {
            orderModel.changeStatus(name, false)
        }
        let progress = 0;
        for (const name in orderModel.data) {
            let field = orderModel.data[name];
            if (field.status == true) {
                progress += 100 / Object.keys(orderModel.data).length;
            }
        }
        this.setState({progress})
    }


    render(){
        let formFields = [];
        let infoList = [];
       
        for(let name in orderModel.data){
            let field = orderModel.data[name];
            let status = "";
            if (field.status === true) {
                status = styles.valid;
            } else if (field.status === false) {
                status = styles.invalid;
            }
            formFields.push(
                <Form.Group key={name} controlId={'order-form-' + name}>
                    <Form.Label>{field.label}</Form.Label>
                    <Form.Control
                        className={status} 
                        type="text" 
                        value={field.value}
                        onChange={(e) => {this.onChange(name, e.target.value)}}
                    />
                </Form.Group>
            );
            infoList.push(
                <tr key={field.label + field.value}>
                    <td>{field.label}</td>
                    <td>{field.value}</td>
                </tr>
            )
        }

    let productsList = cartModel.products.map((element, i) => {
      return (
            <tr key={element.title}>
              <td>{element.title}</td>
              <td>{element.price}</td>
              <td>{element.current}</td>
            </tr>
      )
    })

        return (
            <div>
                <h2>Order</h2>
                <ProgressBar now={this.state.progress}/>
                <hr/>
                <Form>
                    {formFields}
                </Form>
                <Button variant="warning" onClick={() => router.moveTo('cart')}>
                    Back to cart
                </Button>
                &nbsp;
                <Button variant="primary" disabled={!orderModel.globalStatus} onClick={this.show}>
                    Apply order
                </Button>
                <Modal show={this.state.showModal} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Is your data correct?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Data</th>
                            </tr>
                            </thead>
                            <tbody>
                            {infoList}
                            <tr>
                                <td>Products</td>
                                <td>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Amount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {productsList}
                                    </tbody>
                                </Table>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.hide}>
                        No
                    </Button>
                    <Button variant="primary" onClick={this.confirm} >
                        Yes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default Order;