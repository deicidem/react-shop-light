import React from 'react';
import PropTypes from 'prop-types';
import AppLazyInput from '~c/inputs/lazy';
import styles from './minmax.module.css';
import {Button} from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
export default class extends React.Component{
    static defaultProps = {
        onChange: function(cnt){}
    }

    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        cnt: PropTypes.number.isRequired,
        onChange: PropTypes.func
    }

    increase = () => {
        this.set(this.props.cnt + 1);
    }

    decrease = () => {
        this.set(this.props.cnt - 1);
    }

    set(newCnt){
        let cnt = Math.min(Math.max(newCnt, this.props.min), this.props.max);
        this.props.onChange(cnt);
    }

    onChange = (e) => {
        let cnt = parseInt(e.target.value);
        this.set(isNaN(cnt) ? this.props.min : cnt);
    }

    render(){
        return (
            <InputGroup>
                <InputGroup.Prepend>
                    <Button variant="outline-primary" size="sm" onClick={this.decrease}>-</Button>
                </InputGroup.Prepend>
                <AppLazyInput
                    nativeProps={{type: 'text', className: "form-control"}}
                    value={this.props.cnt}
                    onChange={this.onChange}
                />
                <InputGroup.Append>
                    <Button variant="outline-primary" size="sm" onClick={this.increase}>+</Button>
                </InputGroup.Append>
                
            </InputGroup>
        );
    }
}
