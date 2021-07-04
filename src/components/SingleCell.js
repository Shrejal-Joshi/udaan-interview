import React from 'react';
import PropTypes from 'prop-types';


export default class  SingleCell extends React.Component {

    constructor(props){
        super(props)
        this.state={
            editing : false,
            value : props.value

        }
        this.displayData = this.calculateDisplay({x : props.x,y : props.y},props.value);
    
        this.setTimer = 0;
        this.show = false;
    }

    componentDidMount()
    {
        window.document.addEventListener('unSelect', this.handleCellUnselect);

    }
    componentWillUpdate ()
    {
        this.displayData = this.calculateDisplay(
            {x:this.props.x, y: this.props.y}, this.state.value
        )
    }

    componentWillUnmount ()
    {
        window.document.removeEventListener('unSelect', this.handleCellUnselect)
    }

    onChange = (e) =>
    {
        this.setState({value : e.target.value});
        this.displayData = this.calculateDisplay(
            {x:this.props.x, y: this.props.y}, e.target.value
        )
    }


    handleCellUnselect = () =>
    {
        if(this.state.selected || this.state.editing)
        {
            this.setState({selected:false, editing:false});
        }
    }


    onKeyPressedOnCell = () =>
    {
        if(!this.state.editing)
        {
            this.setState({editing : true});
        }
    }

    onKeyPressInput = (e) =>
    {

        if(e.key === 'Enter')
        {
            this.onHasValueNew(e.target.value);
        }
    }


    onHasValueNew = (value) =>
    {
        this.props.onChangedValue(
            {
                x : this.props.x, y: this.props.y
            },
            value
        )
        this.setState({editing : false});
    }

    updateUnselect = () =>
    {
        const unSelect = new Event('unSelect')
        window.document.dispatchEvent(unSelect);
    }

    onClicked = () =>
    {
        this.setTimer = setTimeout(() => {
            
            if(!this.show)
            {
                this.updateUnselect();
                this.setState({selected : true});
               
            }
            this.show = false
        }, 100);
    }


    onDoubleClick = () =>
    {
        clearTimeout(this.setTimer);
        this.show = false;
        this.updateUnselect();
        this.setState({editing: true , selected:true})
    }

    calculateDisplay = ({x,y} , value) =>
    {
        return value;
    }

    designCss = () =>
    {
        const css = {
            width : '50px',
            padding : '5px',
            height : '30px',
            boxSizing: 'border-box',
            position : 'relative',
            display : 'inline-block',
            color : 'black',
            border : '1px solid #000',
            overflow :'hidden',
            margin: '0',
            lineHeight : '15px',
            verticalAlign:'top'



        }

        return css;
    }   
    render()
    {
        const cssStyle = this.designCss();

        ////col 0
        if(this.props.x === 0)
        {
            return(
                <span  style={cssStyle}>
                    {this.props.y}
                </span>
            )
        }

        ////row 0
        if(this.props.y === 0)
        {
            const str = 'abcdefghijk'.split('');
            return(
                <span 
                style={cssStyle}
                    onKeyPress={this.onKeyPressedOnCell}

                >
                    {str[this.props.x]}
                </span>


            )

            } 

            if(this.state.selected)
            {
                cssStyle.outlineColor = "lightBlue";
            }

            if(this.state.editing)
            {
                return(
                    <input
                        type="text"
                        onKeyPress={this.onKeyPressInput}
                        value={this.state.value}
                        onChange ={this.onChange}
                        autoFocus
                        style={cssStyle}
                    
                    />
                )
            }

        
        return (

            <span  style={cssStyle}
                onClick ={(e) => this.onClicked(e)}
                onDoubleClick ={(e) => this.onDoubleClick(e)}
            >

                {this.displayData}

            </span>

        );
    }
  

 
}

SingleCell.propTypes = {
    onChangedValue : PropTypes.func.isRequired,
    x : PropTypes.number.isRequired,
    y : PropTypes.number.isRequired,
    value : PropTypes.string.isRequired

}



