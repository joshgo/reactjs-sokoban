import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BoardView from './BoardView'
import BoardModel from './BoardModel'

class App extends Component {
    constructor(props) {
        super(props);
        console.log("app created");
    }

    getMaxSideLength(){
        var min = Math.max(250, Math.min(this.state.width, this.state.height));
    }

    getScreen(){
        return {
            width: this.state.width,
            height: this.state.height
        };
    }

    render() {
        var boardView = <BoardView pixels={this.getMaxSideLength()} screen={this.getScreen()} />;

        return (
            boardView
        );
    }

    updateDimensions = () => {
        this.setState({width: window.innerWidth, height: window.innerHeight});
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
}

export default App;
