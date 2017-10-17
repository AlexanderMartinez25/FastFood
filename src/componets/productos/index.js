import React from 'react';
// import Subheader from 'material-ui/Subheader';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import "@material/typography/dist/mdc.typography.css";
import Grid from "./Grid";
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
      justifyContent: 'space-around',
   },
   gridList: {
      width: 100,
      height: 150,
      overflowY: 'auto',
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
      // this.sumProduct = this.sumProduct.bind(this);
      // this.restProduct = this.restProduct.bind(this);

   }

   handleChange = (value) => {
      this.setState({
         slideIndex: value,
      })
   }
   
   addProduct = (product,active,cantidad) => { 

      if (active){ 
         this.deleteProduct(product)
      }else if(cantidad){
         let array = this.state.orderItems;
      
         for (var prop in product) {
            // let value=array[prop],
            //     key = prop;
            product.cantidad=cantidad;

            //remover elemento y concatenar el mismo producto con sus defaul props
         }
         this.setState({
            orderItems: array,
         });
      }else{
         const newItem = {
            id: product.id,
            nombre: product.nombre,
            precio: product.precio,
            cantidad: product.cantidad,
         };
         this.setState((prevState) => ({
            orderItems: prevState.orderItems.concat(newItem),
         }));
      }   
   }

   deleteProduct = (product) => {
      let array = this.state.orderItems,
         itemRemoved = array.filter(function(el) {
             return el.id !== product.id;
         }),
         newArray=itemRemoved;

      this.setState((prevState) => ({
         orderItems: newArray,
      }));
   }


  render() {
   // let order= this.state.cocina.push(this.state.postres)
   
   return (
      <div style={styles.root}>
        <div style={styles.margin}>
          <h3 className="mdc-typography--headline"> Productos</h3>
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
                  <li>{item.cantidad}</li>
               </div>
            ))}
         </ul>
      );
   }
}

 export default GridListExampleSimple;