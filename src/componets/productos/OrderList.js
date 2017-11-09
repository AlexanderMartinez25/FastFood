import React from 'react';
import IconButton from 'material-ui/IconButton';
import ContentClear from 'material-ui/svg-icons/content/clear';


let style= {
   'list-style-type':'decimal',
   clear: {
      float: 'right',
      marginTop: '-15px',  
   }
}

class OrderList extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         show: false
      }
      this.handleHover = this.handleHover.bind(this);
   }

   handleHover(){
      this.setState({
         show: !this.state.show
      });
   }

   render() {
      return (
         <div>
            <h3>Orden:</h3>
            <ul style={style} className="orderList">
               {this.props.orderItems.map(item => (
                  <div>
                     <li key={item.id} onMouseOver={ this.handleHover } onMouseOut={ this.handleHover }> 
                        <IconButton style={style.clear} tooltip="Eliminar" onClick={(e) => this.props.eventoDeleteProduct(item, e)}>
                          
                              {/* {this.state.show ? ( */}
                                 <ContentClear />
                           {/* ) : null 
                           } */}
                        </IconButton>
                        <strong>{item.nombre}</strong>  ${item.precio}  <br />
                        Cant. {item.cantidad}
                        { item.comentarios.length>1 && 
                           <div> ({item.comentarios}) <br /> </div> 
                        }
                     </li>
                  </div>
               ))}
            </ul>
         </div>         
      );
   }
}
export default OrderList;