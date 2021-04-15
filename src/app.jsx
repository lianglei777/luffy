import React from 'react';
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx'

import './app.less';

class countStore {

    constructor() {
        makeAutoObservable(this);
    }
  
    count = 0;


    onAdd = () => {
        this.count ++;
    }
};

const store = new countStore();

@observer
class App extends React.Component {


    render() {

        return (
            <div>
                <div>{store.count}</div>
                <div onClick={store.onAdd}>{'add'}</div>
            </div>
        );
    }
}

export default App;