import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import "@material/typography/dist/mdc.typography.css";
import {
   Step,
   Stepper,
   StepLabel,
 } from 'material-ui/Stepper';
import MenuProductos from "./MenuProductos";
import TipoPago from "./TipoPago";
import InfoCambio from './InfoCambio'



class GridListExampleSimple extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         finished: false,
         stepIndex: 0,
         orderList: [],
         subtotal: 0,        
         cambio : 0,
         valueEfectivo : 0,
         valueCheque : 0,
         toggleEfectivo : false,
         toggleCheque : false,
         
      }
      this.getOrderIntems = this.getOrderIntems.bind(this);
      this.totalizar = this.totalizar.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
      this.toggleEfectivo = this.toggleEfectivo.bind(this);
      this.toggleCheque = this.toggleCheque.bind(this);

   }

   getOrderIntems(list) {
      this.setState ({
         orderList: list
      })
      this.totalizar(list,'precio')
   }

   handleNext = () => {
      const {stepIndex,valueCheque,valueEfectivo,subtotal} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
        cambio: (valueCheque+valueEfectivo)-subtotal
      });
   };

   handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
   };

   handleInputChange(target) {
      let subtotal = this.state.subtotal,
          name = target.name,
          montoTotal = this.unformat(target.value,subtotal);
          // cambio = (montoTotal+this.state.valueCheque+this.state.valueEfectivo) - subtotal;
      this.setState({ [name] : montoTotal});

   }
   
   unformat(value){
      let monto1 = value.replace("$",''),
          monto2 = monto1.replace(".",''),
          montoTotal = monto2.replace(",",'.');
      
      return parseInt(montoTotal);
   }

   getStepContent(stepIndex) {
      switch (stepIndex) {
         case 0:
            return <MenuProductos evento={this.getOrderIntems} />;
         case 1:
            return <TipoPago eventoInput={this.handleInputChange} eventoCheque={this.toggleCheque} eventoEfectivo={this.toggleEfectivo} propiedades={this.state}/>;
         case 2:
            
            return <InfoCambio total={this.state.subtotal} cambio={this.state.cambio} />;
         default:
            return 'You\'re a long way from home sonny jim!';
      }
   }

   totalizar (objeto) {
      let resultado = 0;
      for (let i in objeto) {
         resultado += objeto[i].precio*objeto[i].cantidad;
      }
      
      this.setState({
         subtotal : resultado
      })
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

   render() {
      const {finished, stepIndex} = this.state;
      const contentStyle = {margin: '0 16px'};

      return (
         <div style={{width: '100%', maxWidth: 1200, margin: 'auto', 'padding-bottom': '20px'}}>
            <Stepper activeStep={stepIndex}>
               <Step>
                  <StepLabel>Seleccione productos</StepLabel>
               </Step>
               <Step>
                  <StepLabel>Selecciona el metodo de pago</StepLabel>
               </Step>
               <Step>
                  <StepLabel>Finalizar Pedido</StepLabel>
               </Step>
            </Stepper>

            <div style={contentStyle}>
               {finished ? (
                  <a
                  href="#"
                  onClick={(event) => {
                     event.preventDefault();
                     this.setState({
                           finished: false,
                           stepIndex: 0,
                           orderList: [],
                           subtotal: 0,        
                           cambio : 0,
                           valueEfectivo : 0,
                           valueCheque : 0,
                           toggleEfectivo : false,
                           toggleCheque : false
                        });
                  }}
                  >
                  
                  <RaisedButton
                     label="Regresar"
                     primary={true}
                     onClick={(event) => {
                        event.preventDefault();
                        this.setState({
                           finished: false,
                           stepIndex: 0,
                           orderList: [],
                           subtotal: 0,        
                           cambio : 0,
                           valueEfectivo : 0,
                           valueCheque : 0,
                           toggleEfectivo : false,
                           toggleCheque : false
                        });
                     }}
                  />
                  </a> 
               ) : (
                  <div>
                     {this.getStepContent(stepIndex)}
                     <div style={{marginTop: 12}}>
                     <FlatButton
                        label="Cancelar"
                        secondary={true}
                        disabled={stepIndex === 0}
                        onClick={(event) => {
                           event.preventDefault();
                           this.setState({
                              finished: false,
                              stepIndex: 0,
                              orderList: [],
                              subtotal: 0,        
                              cambio : 0,
                              valueEfectivo : 0,
                              valueCheque : 0,
                              toggleEfectivo : false,
                              toggleCheque : false
                           });
                        }}
                        style={{marginRight: 12}}
                     />
                     <FlatButton
                        label="Regresar"
                        disabled={stepIndex === 0}
                        onClick={this.handlePrev}
                        style={{marginRight: 12}}
                     />
                     <RaisedButton
                        label={stepIndex === 2 ? 'Finalizar' : 'Continuar'}
                        primary={true}
                        onClick={this.handleNext}
                        disabled={!this.state.orderList.length}
                     />
                     </div>
                  </div>
               )}
            </div>
         </div> 
      );
   }  
}




export default GridListExampleSimple;