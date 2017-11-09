import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import  logo from "./img/producto.png";


class CardExampleWithAvatar extends React.Component {
   constructor(props) {
      super(props);
      
      this.history()

      this.handledClick = this.handledClick.bind(this);
      this.incrementCant = this.incrementCant.bind(this);
      this.decrementCant = this.decrementCant.bind(this);
	   this.handleComentario = this.handleComentario.bind(this);
      this.history = this.history.bind(this);
      this.createState = this.createState.bind(this);
   }


   history () {
      let idProducto = this.props.id
      // si el producto ya se encuentra en orderItems significa 
      //que debe reaparecer con sus estados
      for (let key in this.props.orderItems) {
         let producto = this.props.orderItems[key]

         if (producto.id === idProducto) {
            return this.createState(true, producto.cantidad, producto.comentarios)
         }

      }
      return this.createState(false)
   }

   createState (isActive, cantidad, comentarios) {
      this.state = {
         active: isActive ? true : false,
         cantidad: cantidad ? cantidad : 1,
         comentario: comentarios ? comentarios : ''
      }

   }

   handledClick () {
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
   
   incrementCant () {
      this.setState({
         cantidad:this.state.cantidad + 1
      });
      this.props.evento(this.props,this.state.comentario,false,this.state.cantidad + 1)
   }
   
   decrementCant () {
      
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
            'textAlign': 'center',
         },
         button:{
            marginRight: 20,
         },
         input: {
            width: '165'
			},
			img: {
				maxHeight: '125px'
			}
      }

      return (
         <Card style={this.state.active ? style.container: ''} >
         
            <CardMedia
            onClick={this.handledClick}
            overlay={<CardTitle title={this.props.precio} />}>
					<img src={this.props.poster ? this.props.poster: logo } style={style.img} alt={this.props.nombre} />
            </CardMedia>
            
            <CardTitle title={this.props.nombre}/>
            
            <CardActions>
            
            {this.state.active &&
               <div style={style.floating}>
                  <TextField hintText="Comentarios" name="comentario" value={this.state.comentario} 
                     onChange={this.handleComentario} style={style.input} autoFocus />
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