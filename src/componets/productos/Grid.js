import React from 'react';
import {GridList} from 'material-ui/GridList';
import ProductsList  from "./ProductsList";


const Grid = (props) => (
   <GridList
      cellHeight={'auto'}
      cols={6}
      padding={15}
      style={props.estilo.gridList} >

      { props.productos.productos.map((producto) => (
         <div>
            <ProductsList
               id={producto.id}
               key={producto.id}
               nombre={producto.nombre}
               descripcion={producto.descripcion}
               poster={producto.poster}
               precio={producto.precio}
               cantidad={1}
               categoria={producto.categoria}
               onProductAdd={props.addProduct}
               evento={props.evento}
               comentario={props.comentario}
               orderItems={props.orderItems}
            />
         </div>
      ))}
      
   </GridList>
);

export default Grid;