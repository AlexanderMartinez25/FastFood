import React, { Component } from 'react';
import SideTopBar from './drawer'


class fullWeb extends Component {
   constructor(props) {
      super(props);
      this.state = {open: false};
   }

   render() {
      return (
         <div>
            <SideTopBar /> 
         </div>
      );
   }
   
}



export default fullWeb;