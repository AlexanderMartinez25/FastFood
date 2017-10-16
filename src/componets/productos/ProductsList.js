import React from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CardExampleWithAvatar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        active: false
      }
      this.handledClick = this.handledClick.bind(this);
  }


  handledClick = () => {
    const currentState = this.state.active;
    this.setState({ active: !currentState });
    this.props.evento(this.props,this.state.active)
  }

  render (){
    const style = {
      background: 'green'
    }

    return (
      <Card onClick={this.handledClick} style={this.state.active ? style: null} >
        <CardMedia
          overlay={<CardTitle title={this.props.precio} />}
        >
          <img src={this.props.poster} alt={this.props.nombre} />
        </CardMedia>
        <CardTitle title={this.props.nombre} />
        <CardText>
          {this.props.descripcion}
        </CardText>
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
      </Card>
    )  
  }
  
};

export default CardExampleWithAvatar;