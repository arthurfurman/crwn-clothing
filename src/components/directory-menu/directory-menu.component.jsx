import React from 'react';
import MenuItem from "../../components/menu-item/menu-item.component";

import './directory-menu.styles.scss';
import SECTIONS_DATA from "./sections.data.js";

class DirectoryMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sections: SECTIONS_DATA
    }
  }

  render() {
    return (
      <div className="directory-menu">
        {this.state.sections.map(({id, ...otherProps}) => (
          <MenuItem key={id} {...otherProps} />
        ))}
      </div>
    );
  }
}

export default DirectoryMenu;
