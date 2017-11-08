import React from 'react';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import NumberFormat from 'react-number-format'
import OrderList from './OrderList'

const styles = {
  block: {
    maxWidth: 1200,
  },
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#ffcccc',
  },
  trackOff: {
    backgroundColor: '#ff9d9d',
  },
  thumbSwitched: {
    backgroundColor: 'red',
  },
  trackSwitched: {
    backgroundColor: '#ff9d9d',
  },
  labelStyle: {
    color: 'red',
  },
  root: {
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-around',
 },
 gridList: {
   width: 500,
   height: 450,
   overflowY: 'auto',
 }
};

class ToggleExampleSimple extends React.Component {
   constructor(props) {
      super(props);
      this.handleToggleEfectivo = this.handleToggleEfectivo.bind(this);
      this.handleToggleTarjeta = this.handleToggleTarjeta.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   handleToggleEfectivo () {
      this.props.eventoEfectivo()
   }

   handleToggleTarjeta () {
      this.props.eventoTarjeta()
   }

   handleChange(event) {
      const target = event.target;
      this.props.eventoInput(target)
   }

   render() {
      return (
         <div style={styles.root}>
				<OrderList orderItems={this.props.propiedades} eventoDeleteProduct={this.props.eventoDeleteProduct}/>
         
            <GridList>
               <div style={styles.block}>
                  <Toggle
                     label="Efectivo"
                     style={styles.toggle}
                     defaultToggled={this.props.propiedades.valueEfectivo}
                     onToggle={this.handleToggleEfectivo}
                  />
                  {this.props.propiedades.toggleEfectivo ? 
                     <NumberFormat hintText="Cantidad" name="valueEfectivo" customInput={TextField} decimalSeparator=","
                         value={this.props.propiedades.valueEfectivo} onChange={this.handleChange} thousandSeparator={'.'} prefix={'$'} /> : null
                  }
                  <Toggle
                     label="Tarjeta"
                     style={styles.toggle}
                     defaultToggled={this.props.propiedades.valueTarjeta}
                     onToggle={this.handleToggleTarjeta}
                  />
                  {this.props.propiedades.toggleTarjeta ? 
                     <NumberFormat hintText="Cantidad" name="valueTarjeta" customInput={TextField} decimalSeparator=","
                        value={this.props.propiedades.valueTarjeta} onChange={this.handleChange} thousandSeparator={'.'} prefix={'$'} /> : null
                  }
               </div>
            </GridList>

            <h3>Total: <NumberFormat value={this.props.propiedades.subtotal} displayType={'text'} 
            decimalSeparator="," thousandSeparator={'.'} prefix={'$'} /></h3>
                        
         </div>
      );
   }
}

export default ToggleExampleSimple;