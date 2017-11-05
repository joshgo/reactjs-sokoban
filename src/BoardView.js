import React, {Component} from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import TileView from './TileView';
import BoardModel from './BoardModel';
import SweetAlert from 'sweetalert-react';
import SokobanGames from './SokobanGames';
import 'sweetalert/dist/sweetalert.css';

class BoardView extends Component {
	constructor(props) {
		super(props);
		this.state = this.getNewBoard();
	}

	getNewBoard() {
        var model = new BoardModel(SokobanGames.getRandomGame());
		return { 
            model : model,
            focus : model.getPosition(),
			alert : false,
			solved : false
		};
	}

	onKeyDown = (event) => {
		var model = this.state.model;
		if (event.key === "Escape") {
			model.resetBoard();
			this.setState({model : model});		
		}
		else if (event.key === "?") {
			this.setState({alert: true});
		}
		else if (event.key === "n" || event.key === "N") {
			this.setState(this.getNewBoard());
		}

		var isFocusedOnTile = this.state.focus.x !== -1; 
		if (!isFocusedOnTile) return;

		var value = parseInt(event.key, 10);
		var direction = '';		
		if (event.key === "Right" || event.key === "ArrowRight") {
			direction = 'r';
		}
		else if (event.key === "Left" || event.key === "ArrowLeft") {
			direction = 'l';
		}
		else if (event.key === "Up" || event.key === "ArrowUp") {
			direction = 'u';
		}
		else if (event.key === "Down" || event.key === "ArrowDown") {
			direction = 'd';
		}

		if (direction !== '') {
            var model = this.state.model;
            model.move(direction);
            this.setState({model: model});
            console.log("new position: " + model.getPosition().x + ", " +  model.getPosition().y);
		}
	}

	componentDidMount() {
		window.addEventListener("keydown", this.onKeyDown);
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onKeyDown);
	}

	render() {
        var tiles = [];
        var maxSides = Math.max(this.state.model.getWidth(), this.state.model.getHeight());
		for(var x = 0; x < this.state.model.getWidth(); x++) {
			for(var y = 0; y < this.state.model.getHeight(); y++) {
                var item = this.state.model.getItem({x:x, y:y});
				var el = <TileView
							x={x} y={y}
							screen={this.props.screen}
							size={this.props.pixels}
							maxSides={maxSides}
							width={this.state.model.getWidth()}
							height={this.state.model.getHeight()}
							item={item}
							/>;
				tiles.push(el);
			}
        }

        tiles.push (
            <SweetAlert
            show={this.state.solved}
            title="Congratulations! You solved the puzzle!"
            text="Click ok to generate a new game"
            onConfirm={() => this.setState(this.getNewBoard())}
                ></SweetAlert>
        );
        
		return (tiles);
	};
}

export default BoardView;