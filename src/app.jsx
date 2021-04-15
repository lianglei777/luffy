import React from 'react';
import { observer } from 'mobx-react';
import { makeAutoObservable } from 'mobx'
import { DatePicker, Space } from 'antd';

// import './app.less';

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

    onChange = (date, dateString) =>  {
        console.log(date, dateString);
    }

    render() {

        return (
            <div>
                {/* <div>{store.count}</div>
                <div  onClick={store.onAdd}>{'add'}</div>
                
                <DatePicker /> */}
                <Space direction="vertical">
                    <DatePicker onChange={this.onChange} />
                    <DatePicker onChange={this.onChange} picker="week" />
                    <DatePicker onChange={this.onChange} picker="month" />
                    <DatePicker onChange={this.onChange} picker="quarter" />
                    <DatePicker onChange={this.onChange} picker="year" />
                </Space>
            </div>
        );
    }
}

export default App;