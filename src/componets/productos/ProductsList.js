import React from 'react';
import {Card, CardActions, CardMedia, CardTitle} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';


class CardExampleWithAvatar extends React.Component {
   constructor(props) {
      super(props);
      

      let idProducto = this.props.id
      if (this.props.orderItems.length > 0) {
         // si el producto ya se encuentra en orderItems significa 
         //que debe reaparecer con sus estados
         // this.props.orderItems.map((producto) => {
         for (let key in this.props.orderItems) {
            let producto = this.props.orderItems[key];
            if (producto.id===idProducto){ 
               return this.state = {
                  active: producto.id ? true : false,
                  cantidad: producto.cantidad ? producto.cantidad : 1,
                  comentario: producto.comentarios ? producto.comentarios : ''
               }
            }  
            // } else {
            //    return this.state = {
            //       active: false,
            //       cantidad: 1,
            //       comentario: ''
            //    }
              
            }
            
      } else {
         this.state = {
            active: false,
            cantidad: 1,
            comentario: ''
         }
      }
                               
		
		// this.history()
 
      this.handledClick = this.handledClick.bind(this);
      this.incrementCant = this.incrementCant.bind(this);
      this.decrementCant = this.decrementCant.bind(this);
		this.handleComentario = this.handleComentario.bind(this);
		// this.history = this.history.bind(this);
   }
   
   // history () {

   // }

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
                  <TextField hintText="Comentarios" name="comentario" value={this.state.comentario} onChange={this.handleComentario} style={style.input}/>
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