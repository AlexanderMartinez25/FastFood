import React from 'react';
import RoomService from 'material-ui/svg-icons/places/room-service';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import LocalDrink from 'material-ui/svg-icons/maps/local-drink';
import LocalBar from 'material-ui/svg-icons/maps/local-bar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Grid from "./Grid";
import SwipeableViews from 'react-swipeable-views';


import { 
   cocina,
   combos,
   postres,
   bebidas,
   productos } from "../../data/";

const styles = {
   root: {
      // display: 'flex',
      // flexWrap: 'wrap',
      justifyContent: 'space-around'
   },
   gridList: {
      width: 100,
      height: 150,
      overflowY: 'auto'
   },
   slide: {
      padding: 10
   },
   tabs: {
      background: '#3F51B5',
   }
};
 
class MenuProductos extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         cocina: cocina,
         postres: postres,
         bebidas: bebidas,
         combos: combos,
         productos: productos,
         slideIndex: 0,
		}
		
      this.handleEventComentario = this.handleEventComentario.bind(this);
   }

   handleChange = (value) => {
      this.setState({
         slideIndex: value,
      })
   }
   
	
   handleEventComentario (product,comentarios,cantidad,isActive) {

		this.props.eventoDeleteProduct(product)

		const newItem = {
			id: product.id,
			nombre: product.nombre,
			precio: product.precio,
			comentarios: comentarios,
         cantidad: cantidad ? cantidad : product.cantidad,
			isActive: isActive         
      };
         
		this.props.eventoComentario(newItem)
   }


   render() {
      return ( 
         <div style={styles.root}>
            <div style={styles.margin}>
               {/* <h3 className="mdc-typography--Headline">Productos</h3> */}

               <Tabs onChange={this.handleChange} value={this.state.slideIndex}>

                  <Tab icon={<RoomService />} label="Cocina" value={0} />
                  <Tab label="Combos"  icon={<Restaurant />} value={1} />
                  <Tab label="Postres" icon={<LocalBar />}   value={2} />
                  <Tab label="Bebidas" icon={<LocalDrink />} value={3} />
               </Tabs>

               <SwipeableViews
                  index={this.state.slideIndex}
                  onChangeIndex={this.handleChange}>

                  <div style={styles.slide} >
                     <Grid 
                        estilo={styles.gridList} 
                        productos={this.state.cocina}
								evento={this.props.eventoAddProduct}
                        orderItems={this.props.listado}
                        comentario={this.handleEventComentario}/>
                  </div>
                  <div style={styles.slide}>
                     <Grid 
                        estilo={styles.gridList}
                        productos={this.state.combos} 
								evento={this.props.eventoAddProduct}
                        orderItems={this.props.listado}
                        comentario={this.handleEventComentario}/>
                  </div>
                  <div style={styles.slide}>
                     <Grid 
                        estilo={styles.gridList} 
                        productos={this.state.postres}
								evento={this.props.eventoAddProduct}
                        orderItems={this.props.listado}
                        comentario={this.handleEventComentario}/>
                  </div>
                  <div style={styles.slide}>
                     <Grid 
                        estilo={styles.gridList} 
                        productos={this.state.bebidas}
								evento={this.props.eventoAddProduct}
                        orderItems={this.props.listado}
                        comentario={this.handleEventComentario}/>
                  </div>
               </SwipeableViews>
            </div>
         </div>
      );
   }
}


export default MenuProductos; 