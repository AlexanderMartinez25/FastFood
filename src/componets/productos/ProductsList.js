import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';


class CardExampleWithAvatar extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         active: false,
         cantidad: 1,
         comentario : ''
      }
      this.handledClick = this.handledClick.bind(this);
      this.incrementCant = this.incrementCant.bind(this);
      this.decrementCant = this.decrementCant.bind(this);
      this.handleComentario = this.handleComentario.bind(this);
   }


   handledClick = () => {
      const currentState = this.state.active;
      this.setState({ 
         active: !currentState,
         cantidad: 1
      });
      this.props.evento(this.props,this.state.comentario,this.state.active)
   }

   handleComentario (e) {
      this.setState ({
         comentario: e.target.value
      }, () => this.APICallFunction())
   }
   
   APICallFunction () {
      this.props.comentario(this.props,this.state.comentario,this.state.cantidad)
   };
   
   incrementCant = () => {
      this.setState({
         cantidad:this.state.cantidad + 1
      });
      this.props.evento(this.props,this.state.comentario,false,this.state.cantidad + 1)
   }

   decrementCant = () => {

      if (this.state.cantidad>1){
         this.setState({
            cantidad:this.state.cantidad - 1
         })
         this.props.evento(this.props,this.state.comentario,false,this.state.cantidad - 1)
      }
   }

   render (){
      const style = {
         container: {
            background: '#E8EAF6',
         },
         textfield: {
            color: '#43A047'
         },
         floating:{
            'text-align': 'center',
         },
         button:{
            marginRight: 20,
         },
         input: {
            width: '165'
         }
      }

      return (
         <Card style={this.state.active ? style.container: ''} >

            <CardMedia
            onClick={this.handledClick}
            overlay={<CardTitle title={this.props.precio} />}>
               <img src={this.props.poster} alt={this.props.nombre} />
            </CardMedia>

            <CardTitle title={this.props.nombre}/>
            
            <CardActions>
            
            {this.state.active &&
               <div style={style.floating}>
                  <TextField hintText="Comentarios" name="comentario" onBlur={this.handleComentario} style={style.input}/>
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