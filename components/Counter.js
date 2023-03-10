import React, { Component } from 'react';

class Counter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            count: 0
        }
    }

    increment() {
        this.setState((previousState) => ({
            count: previousState.count + 1
        }), 
        ()=>{
            console.log("Callback value:", this.state.count);
        });
        console.log("Synchronous value:", this.state.count);
    }

    render() {
        const {count} = this.state;

        return (
            <div>
                <p>Count - {count}</p>
                <button onClick={() => this.increment()}>Increment</button>
            </div>
        )
    }
}

export default Counter;