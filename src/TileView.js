import React, {Component} from 'react';
import boxImage from './box.png'
import boxOnGoalImage from './box-on-goal.png'
import personImage from './person.svg'
import personOnGoalImage from './person.svg'

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
        var style = {
            position: 'absolute', 
            top:  this.props.pixels *  this.props.y + this.props.offset.voffset + 'px',
            left: this.props.pixels *  this.props.x + this.props.offset.hoffset + 'px', 
            width: this.props.pixels + 'px',
            height: this.props.pixels + 'px',
            background: this.getColor(this.props.item),
            textAlign: 'center',
            verticalAlign: 'middle',
            borderStyle: 'solid',
            borderColor: 'black' 
        };
        console.log(this.props);
        console.log(style);
        console.log("style.top/left : " + style.top + ", " + style.left);

        if (this.props.item === 'box' || this.props.item === 'box-on-goal' || this.props.item === 'person' || this.props.item === 'person-on-goal') {
            style = {
                position: 'absolute', 
                top:  this.props.pixels *  this.props.y + this.props.offset.voffset + 'px',
                left: this.props.pixels *  this.props.x + this.props.offset.hoffset + 'px', 
                width: this.props.pixels + 'px',
                height: this.props.pixels + 'px',
                background: this.getColor(this.props.item),
                borderStyle: 'solid',
                borderColor: 'black' 
            };			
            var imgStyle = {
                verticalAlign:'middle',
                horizontalAlign:'center',
                width : (this.props.pixels-1) + 'px',
                height: this.props.pixels + 'px'
            };
            var imageSrc = '';
            if (this.props.item === 'box') 
                imageSrc = boxImage;
            else if (this.props.item === 'box-on-goal')
                imageSrc = boxOnGoalImage;
            else if (this.props.item === 'person')
                imageSrc = personImage;
            else if (this.props.item === 'person-on-goal')
                imageSrc = personOnGoalImage;

            return(
            <div style={style}>
            <img style={imgStyle} src={imageSrc}/>
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