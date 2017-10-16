import React from 'react';
import {GridList} from 'material-ui/GridList';
import ProductsList  from "./ProductsList";


class Grid extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         orderItems: []
      }
      this.addProduct = this.addProduct.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);
   }


   addProduct = (product,active) => { 
      if (active){ 
         this.deleteProduct(product)
      }else{
         const newItem = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
         };
         this.setState((prevState) => ({
            orderItems: prevState.orderItems.concat(newItem),
         }));
      }
      
   }

   deleteProduct = (product) => {
      let array = this.state.orderItems,
      index = array.indexOf(product.id);

      array.splice(index, 1);

      this.setState((prevState) => ({
         orderItems: array,
      }));
   }

   render(){
      return(
         <div>
            <GridList
               cellHeight={'auto'}
               cols={6}
               padding={15}
               style={this.props.estilo.gridList} >
               {this.props.productos.productos.map((producto) => (
                  <div>

                     <ProductsList
                        id={producto.id}
                        key={producto.id}
                        nombre={producto.nombre}
                        descripcion={producto.descripcion}
                        poster={producto.poster}
                        precio={producto.precio}
                        categoria={producto.categoria}
                        onProductAdd={this.addProduct}
                        evento={this.props.evento}  
                     />
                  </div>
               ))}
            </GridList>
         </div>
      )
   }
}      



export default Grid;