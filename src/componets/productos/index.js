import React from 'react';
// import Subheader from 'material-ui/Subheader';
import FontIcon from 'material-ui/FontIcon';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import LocalDrink from 'material-ui/svg-icons/maps/local-drink';
import RoomService from 'material-ui/svg-icons/places/room-service';
import LocalBar from 'material-ui/svg-icons/maps/local-bar';
import RaisedButton from 'material-ui/RaisedButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import "@material/typography/dist/mdc.typography.css";
import Grid from "./Grid";
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import { 
   cocina,
   combos,
   postres,
   bebidas,
   productos } from "../../data/";

const styles = {
   root: {
      // display: 'flex',
      flexWrap: 'wrap',
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
   margin: {
      padding: 15
   },
   tabs: {
      background: '#3F51B5',
   },
   raised:{
      float:'right',
   }
};

/**
 * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
 */
class GridListExampleSimple extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         cocina: cocina,
         postres: postres,
         bebidas: bebidas,
         combos: combos,
         productos: productos,
         slideIndex: 0,
         orderItems: []
      }
      this.addProduct = this.addProduct.bind(this);
      this.deleteProduct = this.deleteProduct.bind(this);
      // this.sumProduct = this.sumProduct.bind(this);
      // this.restProduct = this.restProduct.bind(this);

   }

   handleChange = (value) => {
      this.setState({
         slideIndex: value,
      })
   }
   
   addProduct = (product,active,cantidad) => { 
      //Si el producto se encuentra activo
      if (active){ 
         this.deleteProduct(product)
         return
      }else if(cantidad){//si se esta sumando al mismo producto
         this.deleteProduct(product)
      };
      const newItem = {
         id: product.id,
         nombre: product.nombre,
         precio: product.precio,
         cantidad: cantidad ? cantidad : product.cantidad,
      };
      this.setState((prevState) => ({
         orderItems: prevState.orderItems.concat(newItem),
      }));
   };

   deleteProduct = (product) => {
      let array = this.state.orderItems,
         itemRemoved = array.filter(function(el) {
             return el.id !== product.id;
         }),
         newArray=itemRemoved;

      this.setState((prevState) => ({
         orderItems: newArray,
		}));		
   };

   render() {
      return (
         <div style={styles.root}>
            <div style={styles.margin}>
               <Card>
                  <CardActions>
                     <RaisedButton label="Continuar" primary={true} style={styles.raised}/>
                     <h3 className="mdc-typography--Headline">Productos</h3>{/* <OrderList orderItems={this.state.orderItems} /> */}                     
                  </CardActions>
                  <Tabs
                     onChange={this.handleChange}
                     value={this.state.slideIndex}>

                     <Tab 
                        icon={<RoomService />}
                        label="Cocina" 
                        value={0} />
                     <Tab 
                        label="Combos" 
                        icon={<Restaurant />}
                        value={1} />
                     <Tab 
                        label="Postres" 
                        icon={<LocalBar />}
                        value={2} />

                     <Tab 
                        label="Bebidas" 
                        icon={<LocalDrink />}
                        value={3} />
                  </Tabs>

                  <SwipeableViews
                     index={this.state.slideIndex}
                     onChangeIndex={this.handleChange}>

                     <div style={styles.slide} >
                     <Grid 
                           estilo={styles.gridList} 
                           productos={this.state.cocina}
                           evento={this.addProduct}/>
                     </div>
                     <div style={styles.slide}>
                        <Grid 
                           estilo={styles.gridList}
                           productos={this.state.combos} 
                           evento={this.addProduct}/>
                     </div>
                     <div style={styles.slide}>
                        <Grid 
                           estilo={styles.gridList} 
                           productos={this.state.postres}
                           evento={this.addProduct}/>
                     </div>
                     <div style={styles.slide}>
                        <Grid 
                           estilo={styles.gridList} 
                           productos={this.state.bebidas}
                           evento={this.addProduct}/>
                     </div>
                  </SwipeableViews>
               </Card>
            </div>
         </div>  
      );
   }  
}

// class OrderList extends React.Component {
//    render() {
//       return (
//          <ul>
//             {this.props.orderItems.map(item => (
//                <div>
//                   <li key={item.id}>{item.id}</li>
//                   <li>{item.nombre}</li>
//                   <li>{item.precio}</li>
//                   <li>{item.cantidad}</li>
//                </div>
//             ))}
//          </ul>
//       );
//    }
// }

export default GridListExampleSimple;