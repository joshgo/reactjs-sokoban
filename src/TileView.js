import React, {Component} from 'react';

class TileView extends Component {
	constructor(props) {
		super(props);
    }

	getColor(type) {
		if (type === "wall")
            return 'black';
        else if(type === "person") 
            return 'blue';
        else if(type === "floor")
            return 'yellow';
        else if(type === 'box')
            return 'brown';
        else if(type === 'box-on-goal')
            return 'green';
        else
            return 'yellow';
	}

	render() {
		var hoffset = this.props.screen.width / 2 - (this.props.size * 9 / 2);
		var voffset = this.props.screen.height/ 2 - (this.props.size * 9 / 2);

		var style = {
			position: 'absolute', 
			top:  this.props.size *  this.props.y + voffset + 'px',
			left: this.props.size *  this.props.x + hoffset + 'px', 
			width: this.props.size + 'px',
			height: this.props.size + 'px',
			background: this.getColor(this.props.item),
			textAlign: 'center',
			verticalAlign: 'middle',
			lineHeight: this.props.size + 'px',
			fontSize : (this.props.size * .8) + 'px',
			borderStyle: 'solid',
			borderColor: 'black' 
		};

        return (
            <div style={style}></div>
        );
	}
}

export default TileView;