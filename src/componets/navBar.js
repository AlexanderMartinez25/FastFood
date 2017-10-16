import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconRight from './font-icon'
/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class AppBarExampleIcon extends React.Component {
  constructor(props) {
      super(props);

      this.onClick = this.onClick.bind(this);
  }
  onClick(){
      this.props.handleToggle();
  }

  render() {
    return (
      <div> 
        <AppBar
          title={"Don Jose Fast Food"}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.onClick}
          onRightIconButtonTouchTap={IconRight}
        />
      </div> 
    )
  }
};



export default AppBarExampleIcon;