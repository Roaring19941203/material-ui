let React = require('react');
let CssEvent = require('../utils/css-event');
let Dom = require('../utils/dom');
let KeyLine = require('../utils/key-line');
let KeyCode = require('../utils/key-code');
let StylePropable = require('../mixins/style-propable');
let Transitions = require('../styles/transitions');
let ClickAwayable = require('../mixins/click-awayable');
let Paper = require('../paper');
let MenuItem = require('./menu-item');
let LinkMenuItem = require('./link-menu-item');
let SubheaderMenuItem = require('./subheader-menu-item');
let WindowListenable = require('../mixins/window-listenable');


/***********************
* Nested Menu Component
***********************/
var NestedMenuItem = React.createClass({

  mixins: [ClickAwayable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    text: React.PropTypes.string,
    menuItems: React.PropTypes.array.isRequired,
    zDepth: React.PropTypes.number,
    disabled: React.PropTypes.bool,
    active: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    menuItemStyle: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      disabled: false
    };
  },

  getInitialState() {
    return {
      open: false ,
      activeIndex:0
    };
  },

  componentClickAway() {
    this._closeNestedMenu();
  },

  componentDidMount() {
    this._positionNestedMenu();
    let el = this.getDOMNode();
    el.focus();
  },

  componentDidUpdate() {
    this._positionNestedMenu();
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        color: this.context.muiTheme.palette.textColor
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2),
        float: 'right',
        width: 42
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };
    return styles;
  },

  getTheme() {
    return this.context.muiTheme.component.menuItem;
  },

  render() {

    let styles = this.getStyles();
    styles = this.mergeAndPrefix(styles.root,
      (this.props.active && !this.props.disabled) && styles.rootWhenHovered, {
      position: 'relative'
    }, this.props.style);

    let iconCustomArrowDropRight = {
      marginRight: this.getSpacing().desktopGutterMini * -1,
      color: this.context.muiTheme.component.dropDownMenu.accentColor
    };

    let {
      index,
      menuItemStyle,
      ...other
    } = this.props;

    return (
      <div
          ref="root"
          style={styles}
          onMouseEnter={this._openNestedMenu}
          onMouseLeave={this._closeNestedMenu}
          onMouseOver={this._handleMouseOver}
          onMouseOut={this._handleMouseOut}>
        <MenuItem
          index={index}
          style={menuItemStyle}
          disabled={this.props.disabled}
          iconRightStyle={iconCustomArrowDropRight}
          iconRightClassName="muidocs-icon-custom-arrow-drop-right"
          onTouchTap={this._onParentItemTap}>
            {this.props.text}
        </MenuItem>
        <Menu {...other}
          ref="nestedMenu"
          menuItems={this.props.menuItems}
          menuItemStyle={menuItemStyle}
          onItemTap={this._onMenuItemTap}
          hideable={true}
          visible={this.state.open}
          onRequestClose={this._closeNestedMenu}
          zDepth={this.props.zDepth + 1} />
      </div>
    );
  },

  toggleNestedMenu() {
    if (!this.props.disabled) this.setState({ open: !this.state.open });
  },

  isOpen() {
    return this.state.open;
  },

  _positionNestedMenu() {
    let el = React.findDOMNode(this);
    let nestedMenu = React.findDOMNode(this.refs.nestedMenu);
    nestedMenu.style.left = el.offsetWidth + 'px';
  },

  _openNestedMenu() {
    if (!this.props.disabled) this.setState({ open: true });
  },

  _closeNestedMenu() {
    this.setState({ open: false });
    React.findDOMNode(this).focus();
  },

  _onParentItemTap() {
    this.toggleNestedMenu();
  },

  _onMenuItemTap(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
    this._closeNestedMenu();
  },
  _handleMouseOver(e) {
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e, this.props.index);
  },

  _handleMouseOut(e) {
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e,this.props.index);
  }

});


/****************
* Menu Component
****************/
var Menu = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    autoWidth: React.PropTypes.bool,
    onItemTap: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    onRequestClose: React.PropTypes.func,
    menuItems: React.PropTypes.array.isRequired,
    selectedIndex: React.PropTypes.number,
    hideable: React.PropTypes.bool,
    visible: React.PropTypes.bool,
    zDepth: React.PropTypes.number,
    menuItemStyle: React.PropTypes.object,
    menuItemStyleSubheader: React.PropTypes.object,
    menuItemStyleLink: React.PropTypes.object,
    menuItemClassName: React.PropTypes.string,
    menuItemClassNameSubheader: React.PropTypes.string,
    menuItemClassNameLink: React.PropTypes.string,
  },

  getInitialState() {
    return {
      nestedMenuShown: false,
      activeIndex:0
    };
  },

  getDefaultProps() {
    return {
      autoWidth: true,
      hideable: false,
      visible: true,
      zDepth: 1,
      onRequestClose() {}
    };
  },

  componentDidMount() {
    let el = React.findDOMNode(this);

    //Set the menu width
    this._setKeyWidth(el);

    //Show or Hide the menu according to visibility
    this._renderVisibility();
  },

  componentDidUpdate(prevProps) {
    if (this.props.visible !== prevProps.visible) this._renderVisibility();
  },

  componentWillReceiveProps(nextProps) {
    //Set the menu width
    this._setKeyWidth(React.findDOMNode(this));
  },

  getTheme() {
    return this.context.muiTheme.component.menu;
  },

  getSpacing() {
    return this.context.muiTheme.spacing;
  },

  getStyles() {
    let styles = {
      root: {
        backgroundColor: this.getTheme().containerBackgroundColor,
        paddingTop: this.getSpacing().desktopGutterMini,
        paddingBottom: this.getSpacing().desktopGutterMini,
        transition: Transitions.easeOut(null, 'height'),
        outline:'none !important'
      },
      subheader: {
        paddingLeft: this.context.muiTheme.component.menuSubheader.padding,
        paddingRight: this.context.muiTheme.component.menuSubheader.padding
      },
      hideable: {
        opacity: (this.props.visible) ? 1 : 0,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        zIndex: 1
      },
      item: {
        height:34
      }
    };
    return styles;
  },

  render() {
    let styles = this.getStyles();
    return (
      <Paper
        ref="paperContainer"
        tabIndex='0'
        onKeyDown={this._onKeyDown}
        zDepth={this.props.zDepth}
        style={this.mergeAndPrefix(
          styles.root,
          this.props.hideable && styles.hideable,
          this.props.style)}>
        {this._getChildren()}
      </Paper>
    );
  },

  _getChildren() {
    let  menuItem,
      itemComponent,
      isSelected,
      isDisabled;

    let styles = this.getStyles();

    this._children = [];
    //This array is used to keep track of all nested menu refs
    this._nestedChildren = [];

    for (let i=0; i < this.props.menuItems.length; i++) {
      menuItem = this.props.menuItems[i];
      isSelected = i === this.props.selectedIndex;
      isDisabled = (menuItem.disabled === undefined) ? false : menuItem.disabled;

      let {
        icon,
        data,
        attribute,
        number,
        toggle,
        onTouchTap,
        ...other
      } = menuItem;

      switch (menuItem.type) {

        case MenuItem.Types.LINK:
          itemComponent = (
            <LinkMenuItem
              key={i}
              index={i}
              active={this.state.activeIndex == i}
              text={menuItem.text}
              disabled={isDisabled}
              className={this.props.menuItemClassNameLink}
              style={this.props.menuItemStyleLink}
              payload={menuItem.payload}
              target={menuItem.target}/>
          );
          break;

        case MenuItem.Types.SUBHEADER:
          itemComponent = (
            <SubheaderMenuItem
              key={i}
              index={i}
              className={this.props.menuItemClassNameSubheader}
              style={this.mergeAndPrefix(styles.subheader, this.props.menuItemStyleSubheader)}
              firstChild={i === 0}
              text={menuItem.text} />
          );
          break;

        case MenuItem.Types.NESTED:
          let {
            ref,
            key,
            index,
            zDepth,
            ...other
          } = this.props;

          itemComponent = (
            <NestedMenuItem
              {...other}
              ref={i}
              key={i}
              index={i}
              nested={true}
              active={this.state.activeIndex == i}
              text={menuItem.text}
              disabled={isDisabled}
              menuItems={menuItem.items}
              menuItemStyle={this.props.menuItemStyle}
              zDepth={this.props.zDepth}
              onMouseOver={this._onItemActivated}
              onMouseOut={this._onItemDeactivated}
              onItemTap={this._onNestedItemTap} />
          );
          this._nestedChildren.push(i);
          break;

        default:
          itemComponent = (
            <MenuItem
              {...other}
              selected={isSelected}
              key={i}
              index={i}
              active={this.state.activeIndex == i}
              icon={menuItem.icon}
              data={menuItem.data}
              className={this.props.menuItemClassName}
              style={this.props.menuItemStyle}
              attribute={menuItem.attribute}
              number={menuItem.number}
              toggle={menuItem.toggle}
              onToggle={this.props.onToggle}
              disabled={isDisabled}
              onTouchTap={this._onItemTap}
              onMouseOver={this._onItemActivated}
              onMouseOut={this._onItemDeactivated}
              >
              {menuItem.text}
            </MenuItem>
          );
      }
      this._children.push(itemComponent);
    }

    return this._children;
  },

  _setKeyWidth(el) {
    el.style.width = 'auto';

    let menuWidth = this.props.autoWidth ?
      KeyLine.getIncrementalDim(el.offsetWidth) + 'px' :
      '100%';

    //Update the menu width
    Dom.withoutTransition(el, () => {
      el.style.width = menuWidth;
    });
  },

  _renderVisibility() {
    let el;

    if (this.props.hideable) {
      el = React.findDOMNode(this);
      let container = React.findDOMNode(this.refs.paperContainer);

      if (this.props.visible) {
        //Hide the element and allow the browser to automatically resize it.
        el.style.transition = '';
        el.style.visibility = 'hidden';
        el.style.height = 'auto';

        //Determine the height of the menu.
        let padding = this.getSpacing().desktopGutterMini;
        let height = el.offsetHeight +
            //Add padding to the offset height, because it is not yet set in the style.
            (padding * 2);

        //Unhide the menu with the height set back to zero.
        el.style.height = '0px';
        el.style.visibility = 'visible';

        //Add transition if it is not already defined.
        el.style.transition = Transitions.easeOut();

        //Open the menu
        setTimeout(() => {
          // Yeild to the DOM, then apply height and padding. This makes the transition smoother.
          el.style.paddingTop = padding + 'px';
          el.style.paddingBottom = padding + 'px';
          el.style.height = height + 'px';

          //Set the overflow to visible after the animation is done so
          //that other nested menus can be shown
          CssEvent.onTransitionEnd(el, () => {
            //Make sure the menu is open before setting the overflow.
            //This is to accout for fast clicks
            if (this.props.visible) container.style.overflow = 'visible';
            el.focus();
          });
        }, 0);
      }
      else {
        //Close the menu
        el.style.height = '0px';
        el.style.paddingTop = '0px';
        el.style.paddingBottom = '0px';

        //Set the overflow to hidden so that animation works properly
        container.style.overflow = 'hidden';
      }
    }
  },

  _onNestedItemTap(e, index, menuItem) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, menuItem);
  },

  _onItemTap(e, index) {
    if (this.props.onItemTap) this.props.onItemTap(e, index, this.props.menuItems[index]);
  },

  _onItemToggle(e, index, toggled) {
    if (this.props.onItemToggle) this.props.onItemToggle(e, index, this.props.menuItems[index], toggled);
  },
  _onItemActivated(e, index) {
    this.setState({activeIndex: index});
  },
  _onItemDeactivated(e, index) {
    if (this.state.activeKey == index)
      this.setState({activeIndex: 0});
  },

  _onKeyDown(e) {
    if (!(this.state.open || this.props.visible))
      return;

    let nested = this._children[this.state.activeIndex];
    if (nested && nested.props.nested && this.refs[this.state.activeIndex].isOpen())
      return;

    switch(e.which) {
      case KeyCode.UP:
        this._activatePreviousItem();
        break;
      case KeyCode.DOWN:
        this._activateNextItem();
        break;
      case KeyCode.RIGHT:
        this._tryToggleNested(this.state.activeIndex);
        break;
      case KeyCode.LEFT:
        this._close();
        break;
      case KeyCode.ESC:
        this._close();
        break;
      case KeyCode.TAB:
        this._close();
        return; // so the tab key can propagate
      case KeyCode.ENTER:
      case KeyCode.SPACE:
        e.stopPropagation(); // needs called before the close
        this._triggerSelection(e);
        break;
      default:
        return; //important
    }
    e.preventDefault();
    e.stopPropagation();
  },

  _activatePreviousItem() {
    let active = this.state.activeIndex || 0;
    active = Math.max(active - 1, 0);
    this.setState({activeIndex:active});
  },

  _activateNextItem() {
    let active = this.state.activeIndex || 0;
    active = Math.min(active+1, this._children.length -1);
    this.setState({activeIndex:active});
  },

  _triggerSelection(e) {
    let index = this.state.activeIndex || 0;
    this._onItemTap(e, index);
  },

  _close() {
    this.props.onRequestClose();
  },

  _tryToggleNested(index) {
    let item = this.refs[index];
    let toggleMenu = item.toggleNestedMenu;
    if (item && item.toggleNestedMenu)
      item.toggleNestedMenu();
  }

});

module.exports = Menu;
