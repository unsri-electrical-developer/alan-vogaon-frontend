import React from 'react';
import './../../../../styles/css/ImageTooltip.css'; // Import the CSS file for styling

class ImageTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false
    };
  }

  handleMouseEnter = () => {
    this.setState({ showTooltip: true });
  };

  handleMouseLeave = () => {
    this.setState({ showTooltip: false });
  };

  render() {
    const { imageUrl, tooltipText } = this.props;
    const { showTooltip } = this.state;

    return (
      <div className="image-tooltip-container"
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}>
        {showTooltip && (
          <div className="tooltip">
            <img src="https://storage.googleapis.com/unipin-dev/images/icon_direct_topup_games/1677658519-icon-Solid_black.png"/>
            <span>test</span>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default ImageTooltip;