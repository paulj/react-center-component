'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports['default'] = centerComponent;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

/**
 * This is a higher order component decorator
 *
 * It listens for when its children are mounted, then it measures the size of
 * these children on the dom. Then it updates the children with appropriate
 * top and left offsets.
 *
 * Components that are wrapped with this decorator recieve two properties
 * topOffset and leftOffset, they are null before the component has mounted.
 *
 * When the window is resized, this component will reupdate its children. This process
 * is debounced by 100ms to reduce CPU strain
 */

function centerComponent(DecoratedComponent) {
  var componentClassName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

  return (function (_React$Component) {
    _inherits(Centered, _React$Component);

    function Centered() {
      var _this = this;

      _classCallCheck(this, Centered);

      _get(Object.getPrototypeOf(Centered.prototype), 'constructor', this).apply(this, arguments);

      this.state = {
        topOffset: null,
        leftOffset: null
      };

      this.resizeChildNode = function () {
        var node = _react2['default'].findDOMNode(_this.refs.component);

        var nodeSize = {
          height: node.clientHeight,
          width: node.clientWidth
        };

        var windowSize = {
          height: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth
        };

        _this.setState({
          topOffset: (windowSize.height - nodeSize.height) / 2,
          leftOffset: (windowSize.width - nodeSize.width) / 2
        });
      };
    }

    _createClass(Centered, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this.resizeChildNode();
        this._debouncedResize = (0, _lodash.debounce)(this.resizeChildNode, 100);
        window.addEventListener('resize', this._debouncedResize);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        window.removeEventListener('resize', this._debouncedResize);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.children != prevProps.children) {
          // children are different, resize
          this.resizeChildNode();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state;
        var topOffset = _state.topOffset;
        var leftOffset = _state.leftOffset;

        return _react2['default'].createElement(DecoratedComponent, _extends({}, this.props, {
          ref: 'component',
          topOffset: topOffset,
          top: topOffset,
          leftOffset: leftOffset,
          left: leftOffset,
          recenter: this.resizeChildNode }));
      }
    }], [{
      key: 'displayName',
      value: componentClassName + 'Centered',
      enumerable: true
    }]);

    return Centered;
  })(_react2['default'].Component);
}

module.exports = exports['default'];