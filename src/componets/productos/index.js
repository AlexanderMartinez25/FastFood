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
         valueTarjeta : 0,
         toggleEfectivo : false,
         toggleTarjeta : false,
         cancelarPedido : false,
         orderItems: []
      }
      this.getOrderItems = this.getOrderItems.bind(this)
      this.totalizar = this.totalizar.bind(this)
      this.handleInputChange = this.handleInputChange.bind(this)
      this.toggleEfectivo = this.toggleEfectivo.bind(this)
      this.toggleTarjeta = this.toggleTarjeta.bind(this)
      this.forceUpdateHandler = this.forceUpdateHandler.bind(this)
      this.deleteProduct = this.deleteProduct.bind(this)
      this.addProduct = this.addProduct.bind(this)
      this.APICallFunction = this.APICallFunction.bind(this)
      this.handleComentario = this.handleComentario.bind(this)
   }

   forceUpdateHandler() {
      this.forceUpdate()
      return <MenuProductos listado={this.state.orderList}
         evento={this.getOrderItems} eventoAddProduct={this.addProduct} eventoComentario={this.handleComentario}
         eventoDeleteProduct={this.deleteProduct} />;
   }

   getOrderItems(list) {
      this.setState ({
         orderList: list
      })
      this.totalizar(list,'precio')
   }

   handleNext = () => {
      const {stepIndex,valueTarjeta,valueEfectivo,subtotal} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
        cambio: (valueTarjeta+valueEfectivo)-subtotal
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
          // cambio = (montoTotal+this.state.valueTarjeta+this.state.valueEfectivo) - subtotal;
      this.setState({ [name] : montoTotal});

   }
   
   unformat(value){
      if (value === "") {
         return 0
      }
      let monto1 = value.replace("$",''),
          monto2 = monto1.replace(".",''),
          montoTotal = monto2.replace(",",'.');
      
      return parseInt(montoTotal);
   }

   getStepContent(stepIndex) {
      switch (stepIndex) {
         case 0:
            // si se cancela el pedido limpiar todo el componente
            if (this.state.cancelarPedido){
               this.setState({
                  cancelarPedido: false
               }, () => this.forceUpdateHandler())
               return
            }
            return <MenuProductos listado={this.state.orderList} 
                     evento={this.getOrderItems} eventoAddProduct={this.addProduct} eventoComentario={this.handleComentario}
                     eventoDeleteProduct={this.deleteProduct}/>;
         case 1:
            return <TipoPago eventoInput={this.handleInputChange} 
                     eventoTarjeta={this.toggleTarjeta} eventoDeleteProduct={this.deleteProduct}
                     eventoEfectivo={this.toggleEfectivo} propiedades={this.state}/>;
         case 2:
            return <InfoCambio total={this.state.subtotal} cambio={this.state.cambio} />;
         default:
            return 'You\'re a long way from home sonny jim!';
      }
   }

   totalizar (list) {
      let resultado = 0;
      for (let i in list) {
         resultado += list[i].precio*list[i].cantidad;
      }
      
      this.setState({
         subtotal : resultado
      })
   }

   toggleEfectivo () {
      const currentStateE = this.state.toggleEfectivo;
      this.setState({ 
			toggleEfectivo: !currentStateE,
			valueEfectivo: 0
      });
   }

   toggleTarjeta () {
      const currentStateT = this.state.toggleTarjeta;
      this.setState({ 
			toggleTarjeta: !currentStateT,
			valueTarjeta: 0
      });
   }

   addProduct(product, comentarios, active, cantidad) {

      //Si el producto se encuentra activo
      if (active) {
         this.deleteProduct(product)
         return
      } else if (cantidad) {//si se esta sumando al mismo producto
         this.deleteProduct(product)
      };

      const newItem = {
         id: product.id,
         nombre: product.nombre,
         precio: product.precio,
         comentarios: comentarios,
         cantidad: cantidad ? cantidad : product.cantidad,
         isActive: !active
      };

      this.setState((prevState) => ({
         orderItems: prevState.orderItems.concat(newItem),
      }), () => this.APICallFunction()
      )
   }

   APICallFunction() {
      this.getOrderItems(this.state.orderItems)
   }

   deleteProduct(product) {
      let array = this.state.orderItems,
         itemRemoved = array.filter(function (el) {
            return el.id !== product.id;
         }),
         newArray = itemRemoved;

      this.setState((prevState) => ({
            orderItems: newArray,
         }), () => this.APICallFunction()
      )

   }

   handleComentario (newItem) {
      this.setState((prevState) => ({
            orderItems: prevState.orderItems.concat(newItem),
         }), () => this.APICallFunction()
      )
   }
   start (cancel,order) {
      this.setState({
         finished: false,
         stepIndex: 0,
         orderList: [],
         subtotal: 0,
         cambio: 0,
         valueEfectivo: 0,
         valueTarjeta: 0,
         toggleEfectivo: false,
         toggleTarjeta: false,
         cancelarPedido: cancel ? cancel : false,
         orderItems: order ? [] : this.state.orderItems
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
                     event.preventDefault()
                     this.start()
                  }}
                  >
                  
                  <RaisedButton
                     label="Regresar"
                     primary={true}
                     onClick={(event) => {
                        event.preventDefault()
                        this.start()
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
                           this.start(true,true);
                        }}
                        style={{marginRight: 12}}
                        disabled={!this.state.orderList.length}
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