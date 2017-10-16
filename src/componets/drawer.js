import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import RaisedButton from 'material-ui/RaisedButton';
import NavBar from './navBar'
import {
   BrowserRouter as Router,
   Route,
   Link
} from 'react-router-dom';
import  Grid  from "./productos";



export default class DrawerUndockedExample extends React.Component {

   constructor(props) {
      super(props);
      this.state = {open: false};
   }

   handleToggle = () => this.setState({open: !this.state.open});
   handleClose = () => this.setState({open: false});
  
   render() {
      return (
         <div>
            <NavBar handleToggle={this.handleToggle} />

            <Router>
               <div> 
                  <Drawer
                     docked={false}
                     // width={200}
                     open={this.state.open}
                     onRequestChange={(open) => this.setState({open})}
                     >
                  
                     <Link to="/">
                        <MenuItem  onClick={this.handleClose}>
                           Productos
                        </MenuItem>
                     </Link>

                     <Link to="/about">
                        <MenuItem  onClick={this.handleClose}>
                           Home
                        </MenuItem>
                     </Link>
                  
                  </Drawer>
               
                     <Route exact path="/" component={Productos}/>
                  <Route path="/about" component={About}/>
               </div>
            </Router>

         </div>
      );
   }
}
const Productos = () => (
   <Grid />
)

const About = () => (
   <div>
      <h2>About</h2>
   </div>
)

