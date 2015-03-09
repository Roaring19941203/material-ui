var Colors = require('../colors');
var Spacing = require('./spacing');
var Theme = require('../theme').get();
var ColorManipulator = require('../../utils/color-manipulator');

var customVariables = new (function() {
  
  // Spacing
  this.spacing = Spacing;

  // Colors
  this.colors = Colors;

  //Border Colors
  this.borderColor = Colors.grey300;

  // Disabled Colors
  this.disabledColor = Theme.textColor;
  this.disabledOpacity = 0.3; // fadeout 30%

  // Component Colors
  this.appBarColor = Theme.primary1Color;
  this.appBarTextColor = Colors.darkWhite;
  this.canvasColor = Colors.white;
  this.dropDownMenuIconColor = Colors.minBlack;
  this.leftNavColor = Colors.white;
  this.subheaderBorderColor = this.borderColor;
  this.subheaderTextColor = Theme.primary1Color;
  
  // Layout
  this.appBarHeight = Spacing.desktopKeylineIncrement;
  this.leftNavWidth = Spacing.desktopKeylineIncrement * 4;

  // checkbox
  this.checkboxBoxColor = Theme.textColor;
  this.checkboxCheckedColor = Theme.primary1Color;
  this.checkboxRequiredColor = Theme.primary1Color;
  this.checkboxDisabledColor = this.disabledColor;

  // buttons
  this.buttonHeight = 36;
  this.buttonMinWidth = 88;
  this.iconButtonSize = Spacing.iconSize * 2;

  this.flatButtonColor = Colors.white;
  this.flatButtonHoverColor = ColorManipulator.darken(this.flatButtonColor, 0.1);
  this.flatButtonTextColor = Theme.textColor;
  this.flatButtonRippleColor = 'rgba(0,0,0,0.7)';
  this.flatButtonFocusRippleColor = ColorManipulator.fade(this.flatButtonRippleColor, 0.7);
  this.flatButtonPrimaryHoverColor = ColorManipulator.lighten(Theme.accent1Color, 0.32);
  this.flatButtonPrimaryTextColor = Theme.accent1Color;
  this.flatButtonPrimaryRippleColor = ColorManipulator.fade(this.flatButtonPrimaryTextColor, 0.8);
  this.flatButtonPrimaryFocusRippleColor = ColorManipulator.fade(this.flatButtonPrimaryRippleColor, 0.8);
  this.flatButtonSecondaryHoverColor = ColorManipulator.lighten(Theme.primary1Color, 0.52);
  this.flatButtonSecondaryTextColor = Theme.primary1Color;
  this.flatButtonSecondaryRippleColor = ColorManipulator.fade(this.flatButtonSecondaryTextColor, 0.8);
  this.flatButtonSecondaryFocusRippleColor = ColorManipulator.fade(this.flatButtonSecondaryRippleColor, 0.8);
  this.flatButtonDisabledTextColor = ColorManipulator.fade(this.flatButtonTextColor, 0.3);

  // this.raisedButtonColor = Colors.white;
  // this.raisedButtonHoverColor = darken(this.raisedButtonColor, 10%);
  this.raisedButtonTextColor = Theme.textColor;
  // this.raisedButtonRippleColor = rgba(0,0,0,0.1);
  // this.raisedButtonFocusRippleColor = fade(@raised-button-ripple-color, 7%);
  // this.raisedButtonPrimaryColor = @accent-1-color;
  // this.raisedButtonPrimaryHoverColor = darken(@accent-1-color, 15%);
  this.raisedButtonPrimaryTextColor = Colors.white;
  // this.raisedButtonPrimaryRippleColor = fade(@white, 50%);
  // this.raisedButtonPrimaryFocusRippleColor = @raised-button-primary-ripple-color;
  // this.raisedButtonSecondaryColor = @primary-1-color;
  // this.raisedButtonSecondaryHoverColor = darken(@primary-1-color, 4%);
  this.raisedButtonSecondaryTextColor = Colors.white;
  // this.raisedButtonSecondaryRippleColor = fade(@white, 35%);
  // this.raisedButtonSecondaryFocusRippleColor = @raised-button-secondary-ripple-color;
  // this.raisedButtonDisabledColor = @raised-button-hover-color;
  this.raisedButtonDisabledTextColor = ColorManipulator.fade(this.raisedButtonTextColor, 0.3);


  
  // date picker
  this.datePickerColor = Theme.primary1Color;
  this.datePickerTextColor = Colors.white;
  this.datePickerCalendarTextColor = Theme.textColor;
  this.datePickerSelectColor = Theme.primary2Color;
  this.datePickerSelectTextColor = Colors.white;

  // menu
  this.menuBackgroundColor = Colors.white;
  this.menuItemDataHeight = 32;
  this.menuItemHeight = 48;
  this.menuItemHoverColor = 'rgba(0, 0, 0, .035)';
  this.menuItemPadding = Spacing.desktopGutter;
  this.menuItemSelectedTextColor = Theme.accent1Color;
  this.menuContainerBackgroundColor = Colors.white;
  this.menuSubheaderPadding = Spacing.desktopGutter;

  // radio button 
  this.radioButtonBorderColor =  Theme.textColor;
  this.radioButtonBackgroundColor = Colors.white;
  this.radioButtonCheckedColor = Theme.primary1Color;
  this.radioButtonRequiredColor = Theme.primary1Color;
  this.radioButtonDisabledColor = this.disabledColor;
  this.radioButtonSize = 24;

  // slider
  this.sliderTrackSize = 2;
  this.sliderTrackColor = Colors.minBlack;
  this.sliderTrackColorSelected = Colors.grey500;
  this.sliderHandleSize = 12;
  this.sliderHandleSizeActive = this.sliderHandleSize * 2;
  this.sliderHandleSizeDisabled = 8;
  this.sliderHandleColorZero = Colors.grey400;
  this.sliderHandleFillColor = Colors.white;
  this.sliderSelectionColor = Theme.primary3Color;
  this.sliderRippleColor = Theme.primary1Color;

  // snackbar
  this.snackbarTextColor = Colors.white;
  this.snackbarBackgroundColor = '#323232';
  this.snackbarActionColor = Theme.accent1Color;

  // toggle
  this.toggleThumbOnColor = Theme.primary1Color;
  this.toggleThumbOffColor = Colors.grey50;
  this.toggleThumbDisabledColor = Colors.grey400;
  this.toggleThumbRequiredColor = Theme.primary1Color;
  this.toggleTrackOnColor = Theme.primary1Color; // fadeout 50%
  this.toggleTrackOffColor = Colors.minBlack;
  this.toggleTrackDisabledColor = Colors.faintBlack;
  this.toggleTrackRequiredColor = this.toggleThumbRequiredColor; // fadeout 50%

  // toolbar
  this.toolbarBackgroundColor = '#eeeeee'; //darken by 5%
  this.toolbarHeight = 56;
  this.toolbarIconColor = 'rgba(0, 0, 0, .40)';
  this.toolbarSeparatorColor = 'rgba(0, 0, 0, .175)';
  this.toolbarMenuHoverColor = 'rgba(0, 0, 0, .10)';
  this.toolbarMenuHoverColor = Colors.white;

});

module.exports = customVariables;
