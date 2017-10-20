import React from 'react';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import { GridList } from 'material-ui/GridList';
import NumberFormat from 'react-number-format'

const styles = {
  block: {
    maxWidth: 250,
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
      this.state = {
         toggleEfectivo : false,
         toggleCheque : false,
         cambio : '',
         valueEfectivo : '',
         valueCheque : '' 
      }
      this.toggleEfectivo = this.toggleEfectivo.bind(this);
      this.toggleCheque = this.toggleCheque.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
   }

   toggleEfectivo () {
      const currentState = this.state.toggleEfectivo;
      this.setState({ 
         toggleEfectivo: !currentState,
      });
   }

   toggleCheque () {
      const currentState = this.state.toggleCheque;
      this.setState({ 
         toggleCheque: !currentState,
      });
   }

   handleInputChange(event) {
      const target = event.target;
      let subtotal = this.props.subtotal,
          cambio = target.value - subtotal;
  
      // this.setState({
      //   cambio: cambio
      // });

   }

   render() {
      return (
         <div style={styles.root}>
            <GridList>
               <div style={styles.block}>
                  <Toggle
                     label="Efectivo"
                     style={styles.toggle}
                     onToggle={this.toggleEfectivo}
                  />
                  {this.state.toggleEfectivo ? 
                     <NumberFormat hintText="Cantidad" name="velueEfectivo" customInput={TextField} decimalSeparator=","
                         value={this.state.valueEfectivo} isNumericString={true} onChange={this.handleInputChange} thousandSeparator={'.'} prefix={'$'} /> : null
                  }
                  <Toggle
                     label="Cheque"
                     style={styles.toggle}
                     onToggle={this.toggleCheque}
                  />
                  {this.state.toggleCheque ? 
                     <NumberFormat hintText="Cantidad" value="valueCheque" customInput={TextField} decimalSeparator=","
                        value={this.state.valueCheque} onChange={this.handleInputChange} thousandSeparator={'.'} prefix={'$'} /> : null
                  }

                  <h3>Subtotal: <NumberFormat value={this.props.subtotal} displayType={'text'} 
                     decimalSeparator=","  thousandSeparator={'.'} prefix={'$'} /></h3>

                  <h3>Cambio: <NumberFormat value={this.state.cambio} displayType={'text'} 
                     decimalSeparator="," thousandSeparator={'.'} prefix={'$'} /> </h3>
               </div>
            </GridList>
         </div>
      );
   }
}

export default ToggleExampleSimple;