let React = require('react');
let SvgIcon = require('../../svg-icon');

let EditorFormatColorText = React.createClass({

  render: function() {
    return (
      <SvgIcon {...this.props}>
        <path fill-opacity=".36" d="M0 20h24v4H0z"/><path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z"/>
      </SvgIcon>
    );
  }

});

module.exports = EditorFormatColorText;