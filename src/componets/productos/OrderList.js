import React from 'react';
const style= {
   'list-style-type':'decimal',
}

class OrderList extends React.Component {
   render() {
      return (
         <div>
            <h3>Orden:</h3>
            <ul style={style}>
               {this.props.orderItems.map(item => (
                  <div>
                     <li key={item.id}> 
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