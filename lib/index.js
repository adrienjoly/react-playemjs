"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var makePlayem = require('playemjs').makePlayem;

var lastInstance = -1;

module.exports = (function (_React$Component) {
  _inherits(Playem, _React$Component);

  function Playem() {
    _classCallCheck(this, Playem);

    _get(Object.getPrototypeOf(Playem.prototype), "constructor", this).call(this);
    this.state = {
      instance: ++lastInstance,
      status: "loading"
    };
  }

  _createClass(Playem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var playerParams = {
        playerId: "playemjs-player-" + this.state.instance,
        origin: window.location.host || window.location.hostname,
        playerContainer: React.findDOMNode(this.refs.playemContainer)
      };

      window.SOUNDCLOUD_CLIENT_ID = this.props.scApiKey;
      window.DEEZER_APP_ID = this.props.dzApiKey;
      window.DEEZER_CHANNEL_URL = this.props.dzChannelUrl;
      window.JAMENDO_CLIENT_ID = this.props.jaApiKey;

      makePlayem(null, playerParams, function (playem) {
        _this.setState({ status: "ready" });
        playem.on("onTrackChange", function (track) {
          console.log(_this.state.instance, "changed");
          _this.setState({ status: "Loading " + track.playerName + " track, id: " + track.trackId + "..." });
        });
        playem.on("onTrackInfo", function (track) {
          console.log(_this.state.instance, "info");
          _this.setState({ status: "Playing " + track.playerName + " track, id: " + track.trackId });
        });
        playem.on("onPlay", function (track) {
          console.log(_this.state.instance, "play");
        });
        playem.on("onPlaying", function (track) {
          console.log(_this.state.instance, "playing");
        });
        playem.on("onPaused", function (track) {
          console.log(_this.state.instance, "pause");
        });
        _this.props.tracks.map(function (track) {
          playem.addTrackByUrl(track.eId);
        });
        playem.play();
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "Playem component \"",
          this.props.name,
          "\": ",
          this.state.status
        ),
        React.createElement("div", { ref: "playemContainer" }),
        React.createElement(
          "p",
          null,
          "Playlist:"
        ),
        React.createElement(
          "ol",
          null,
          this.props.tracks.map(function (track) {
            return React.createElement(
              "li",
              null,
              track.name
            );
          })
        )
      );
    }
  }]);

  return Playem;
})(React.Component);
