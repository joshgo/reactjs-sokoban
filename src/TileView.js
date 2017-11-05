import React, {Component} from 'react';

class TileView extends Component {
	constructor(props) {
		super(props);
    }

	getColor(type) {
		if (type === "wall")
            return 'black';
        else if(type === "person")
			return 'white';
		else if (type === "person-on-goal")
			return 'lightgreen';
        else if(type === "floor")
            return 'white';
        else if(type === 'box')
            return 'brown';
        else if(type === 'box-on-goal')
            return 'green';
		else if (type === 'goal')
			return 'lightgreen';
		else
            return 'red';
	}

	render() {
		var hoffset = this.props.screen.width / 2 - (50 * this.props.width / 2);
		var voffset = this.props.screen.height/ 2 - (50 * this.props.height / 2);

		var style = {
			position: 'absolute', 
			top:  50 *  this.props.y + voffset + 'px',
			left: 50 *  this.props.x + hoffset + 'px', 
			width: 50 + 'px',
			height: 50 + 'px',
			background: this.getColor(this.props.item),
			textAlign: 'center',
			verticalAlign: 'middle',
			lineHeight: 50 + 'px',
			fontSize : (50 * .8) + 'px',
			borderStyle: 'solid',
			borderColor: 'black' 
		};

		if (this.props.item === 'box' || this.props.item === 'box-on-goal' || this.props.item === 'person' || this.props.item === 'person-on-goal') {
			style = {
				position: 'absolute', 
				top:  50 *  this.props.y + voffset + 'px',
				left: 50 *  this.props.x + hoffset + 'px', 
				width: 50 + 'px',
				height: 50 + 'px',
				background: this.getColor(this.props.item),
				borderStyle: 'solid',
				borderColor: 'black' 
			};			
			var imgStyle = {
				verticalAlign:'middle',
				horizontalAlign:'center',
				width : '50px',
				height: '50px'
			};

			return(
            <div style={style}>
			<img style={imgStyle} src={this.props.item + '.png'}/>
			</div>
			);
		}
		else {
			return (
				<div style={style}></div>
			);
		}
	}
}

export default TileView;