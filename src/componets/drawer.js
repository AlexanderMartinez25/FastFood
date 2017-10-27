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
      this.state = {
         open: false,
         title: 'Productos'
      };
   }

   handleToggle = () => this.setState({open: !this.state.open});
   handleClose = (title) => this.setState({open: false, title:title});
  
   render() {
      return (
         <div>
            <NavBar title={this.state.title} handleToggle={this.handleToggle} />

            <Router>
               <div> 
                  <Drawer
                     docked={false}
                     // width={200}
                     open={this.state.open}
                     onRequestChange={(open) => this.setState({open})}
                     >
                  
                     <Link to="/" >
                        <MenuItem onClick={(e) =>this.handleClose('Productos')}>
                           Productos
                        </MenuItem>
                     </Link>

                     <Link to="/about">
                        <MenuItem onClick={(e) =>this.handleClose('About')}>
                           About
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

