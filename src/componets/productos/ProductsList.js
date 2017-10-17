import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class CardExampleWithAvatar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         active: false,
         cantidad: 1
      }
      this.handledClick = this.handledClick.bind(this);
      this.incrementCant = this.incrementCant.bind(this);
      this.decrementCant = this.decrementCant.bind(this);
   }


   handledClick = () => {
      const currentState = this.state.active;
      this.setState({ active: !currentState });
      this.props.evento(this.props,this.state.active)
   }

   incrementCant = () => {
     this.setState({
        cantidad:this.state.cantidad + 1
     });
     this.props.evento(this.props,false,this.state.cantidad + 1)
   }

   decrementCant = () => {
      if (this.state.cantidad>1){
         this.setState({
            cantidad:this.state.cantidad - 1
         })
      }
   }

   render (){
      const style = {
         background: '#E8EAF6',
         textfield: {
         color: '#43A047'
         },
         floating:{
            'text-align': 'center',
         },
         button:{
            marginRight: 20,
         }
      }

      return (
         <Card style={this.state.active ? style: ''} >

            <CardMedia
            onClick={this.handledClick}
            overlay={<CardTitle title={this.props.precio} />}>
               <img src={this.props.poster} alt={this.props.nombre} />
            </CardMedia>

            <CardTitle title={this.props.nombre}/>

            <CardActions>

               {this.state.active &&
                  <div style={style.floating}>
                     <h3 className="mdc-typography--subheading"> Cantidad: {this.state.cantidad}</h3>
                     <FloatingActionButton
                        style={style.button}  
                        secondary={true} mini={true}
                        onClick={this.decrementCant}>
                        <ContentRemove />
                     </FloatingActionButton>
                     
                     <FloatingActionButton 
                        mini={true}
                        onClick={this.incrementCant}>
                        <ContentAdd />
                     </FloatingActionButton>
                  </div>
               }
            </CardActions>
            

         </Card>
      )  
  }
  
};

export default CardExampleWithAvatar;