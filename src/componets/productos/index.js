import React from 'react';
// import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Grid from "./Grid";
import { 
   cocina,
   combos,
   postres,
   bebidas,
   productos } from "../../data/";

const styles = {
   root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
   },
   gridList: {
      width: 100,
      height: 150,
      overflowY: 'auto',
   },
   headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
   },
   slide: {
      padding: 10,
   },
   margin: {
      padding: 15
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

   }

   handleChange = (value) => {
      this.setState({
         slideIndex: value,
      })
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


  render() {
   // let order= this.state.cocina.push(this.state.postres)
   
   return (
      <div style={styles.root}>
         <div style={styles.margin}>
           <h3 style={styles.headline}> Productos</h3>
           <OrderList orderItems={this.state.orderItems} />

            <Tabs
               onChange={this.handleChange}
               value={this.state.slideIndex}>
               <Tab 
                  // icon={<FontIcon className="muidocs-icon-action-home" />}
                  label="Cocina" 
                  value={0} />
               <Tab 
                  label="Combos" 
                  // icon={<FontIcon className="material-icons">restaurat</FontIcon>}
                  value={1} />
               <Tab 
                  label="Postres" 
                  // icon={<FontIcon className="material-icons">local_drink</FontIcon>}
                  value={2} />

               <Tab 
                  label="Bebidas" 
                  // icon={<FontIcon className="material-icons" >local_cafe</FontIcon>} 
                  value={3} />
            </Tabs>
            <SwipeableViews
               index={this.state.slideIndex}
               onChangeIndex={this.handleChange}>

               <div style={styles.slide} >
                  <Grid 
                     estilo={styles.gridList} 
                     productos={this.state.cocina}
                     evento={this.addProduct}
                  />
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
        </div>
      </div>
      );
   }  
}

class OrderList extends React.Component {
   render() {
     return (
       <ul>
         {this.props.orderItems.map(item => (
            <div>
               <li key={item.id}>{item.id}</li>
               <li>{item.nombre}</li>
               <li>{item.precio}</li>
            </div>
         ))}
       </ul>
     );
   }
}

 export default GridListExampleSimple;