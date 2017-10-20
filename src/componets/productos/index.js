import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import "@material/typography/dist/mdc.typography.css";
import {
   Step,
   Stepper,
   StepLabel,
 } from 'material-ui/Stepper';
import  MenuProductos from "./MenuProductos";
import TipoPago from "./TipoPago";

class GridListExampleSimple extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         finished: false,
         stepIndex: 0,
         orderList: [],
         subtotal: 0
      }
      this.getOrderIntems = this.getOrderIntems.bind(this);
      this.totalizar = this.totalizar.bind(this);
   }

   getOrderIntems(list) {
      this.setState ({
         orderList: list
      })
      this.totalizar(list,'precio')
   }

   handleNext = () => {
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
   };

   handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
   };

   getStepContent(stepIndex) {
      switch (stepIndex) {
         case 0:
            return <MenuProductos evento={this.getOrderIntems} />;
         case 1:
            return <TipoPago subtotal={this.state.subtotal}/>;
         case 2:
            return 'This is the bit I really care about!';
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
   

   render() {
      const {finished, stepIndex} = this.state;
      const contentStyle = {margin: '0 16px'};

      return (
         <div style={{width: '100%', maxWidth: 1200, margin: 'auto'}}>
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
            {/* <OrderList orderItems={this.state.orderList} /> */}

            <div style={contentStyle}>
               {finished ? (
                  <p>
                     <a
                     href="#"
                     onClick={(event) => {
                        event.preventDefault();
                        this.setState({stepIndex: 0, finished: false});
                     }}
                     >
                     Click here
                     </a> to reset the example.
                  </p>
               ) : (
                  <div>
                     <p>{this.getStepContent(stepIndex)}</p>
                     <div style={{marginTop: 12}}>
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