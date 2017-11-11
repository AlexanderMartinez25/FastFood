import React from 'react';
import {GridList} from 'material-ui/GridList';
import ProductsList  from "./ProductsList";
import TextField from 'material-ui/TextField';


class Grid extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
			initialListItems: this.props.productos.productos,
         items: []
      }
      this.filterList = this.filterList.bind(this);
   }

   filterList(e) {
      let updatedList = this.state.initialListItems;
      updatedList = updatedList.filter(function (item) {
         return item.nombre.toLowerCase().search(
            e.target.value.toLowerCase()) !== -1;
			}
		);
      this.setState({ items: updatedList });
   }

   componentWillMount() {
      this.setState({ items: this.state.initialListItems })
   } 

   render() {
      return (
         <div>
            <TextField hintText="Buscar" onChange={this.filterList} style="margin-bottom: 15px; float: right;"/>
            <p>
               <div>
                  <GridList
                  cellHeight={'auto'}
                  cols={6}
                  padding={15}
                  style={this.props.estilo.gridList} >

							{this.state.items.map((producto) => (
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
                           onProductAdd={this.props.addProduct}
                           evento={this.props.evento}
                           comentario={this.props.comentario}
                           orderItems={this.props.orderItems}
                        />
                     </div>
                  ))}
                  </GridList>
               </div>
            </p>
				{
					this.state.items.length<1 &&
					<p>
						No se encontraron coincidencias.
					</p>
				}
         </div>
      );
   }
}


export default Grid;