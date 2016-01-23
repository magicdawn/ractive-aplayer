(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/* global Ractive */

/**
 * module dependencies
 */

var tpl = require('./templates/a_player.html');
var Slide = require('./slide');

/**
 * extend Component
 */

var Aplayer = Ractive.extend({
  template: tpl,
  data: function() {
    return {

    };
  }
});

Ractive.components.Aplayer = Aplayer;
},{"./slide":2,"./templates/a_player.html":3}],2:[function(require,module,exports){
'use strict';
/* global Ractive, $ */

/**
 * module dependencies
 */

var tpl = require('./templates/slide.html');

/**
 * Slide Component
 */

var Slide = Ractive.extend({
  template: tpl,
  data: function() {
    return {
      direction: 'horizontal' // 'vertical'
    };
  },

  // 拖拽开始
  handleMousedown: function() {
    var node = this.event.node;
    var $btn = $(node);
    var $bar = $btn.parent();
    var $barBase = $btn.closest('.bar-base');
    $btn.addClass('__drag');
    var direction = this.get('direction');

    // add on document
    $(document).on('mousemove.ractive.slide', function(e) {
      var val;
      if (direction === 'horizontal') {
        val = (e.clientX - $barBase.offset().left) / $barBase.width();
        if (val < 0) val = 0;
        if (val > 1) val = 1;
        $bar.css('width', val * 100 + '%');
      } else if (direction === 'vertical') {
        val = ($barBase.offset().top + $barBase.height() - e.clientY) / $barBase.height();
        if (val < 0) val = 0;
        if (val > 1) val = 1;
        $bar.css('height', val * 100 + '%');
      }
    });

    $(document).on('mouseup', function() {
      $btn.removeClass('__drag');
      $(document).off('mousemove.ractive.slide');
    });
  },

  handleBarBaseClick: function() {
    var e = this.event.original;
    var node = this.event.node;
    var $barBase = $(node);
    var $bar = $barBase.find('.--bar');
    var direction = this.get('direction');

    var val;
    if (direction === 'horizontal') {
      val = (e.clientX - $barBase.offset().left) / $barBase.width();
      if (val < 0) val = 0;
      if (val > 1) val = 1;
      $bar.css('width', val * 100 + '%');
    } else if (direction === 'vertical') {
      val = ($barBase.offset().top + $barBase.height() - e.clientY) / $barBase.height();
      if (val < 0) val = 0;
      if (val > 1) val = 1;
      $bar.css('height', val * 100 + '%');
    }
  }
});

Ractive.components.Slide = Slide;
module.exports = Slide;

function getElLeft(node) {
  var cur = node;

  // offsetLeft
  var ret = 0;
  while (cur && cur.offsetLeft) {
    ret += cur.offsetLeft;
    cur = cur.offsetParent;
  }

  return ret - document.documentElement.scrollLeft - document.body.scrollLeft;
}
},{"./templates/slide.html":4}],3:[function(require,module,exports){
module.exports = "";

},{}],4:[function(require,module,exports){
module.exports = "<div class=\"bar-base __{{ direction }}\" on-click='handleBarBaseClick()'>\n  <div class=\"--bar\">\n    <div class=\"--btn\" on-mousedown='handleMousedown()'>\n    </div>\n  </div>\n</div>";

},{}]},{},[1]);
