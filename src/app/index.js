import React from 'react';
import styles from './app.module.css';
import router from '~s/router';
import {observer} from 'mobx-react';

@observer class App extends React.Component{
    render(){
        return (
            <div className="container">
                <hr/>
                {router.component}
            </div>
        )
    }
}

export default App;