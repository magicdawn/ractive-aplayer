(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/* global Ractive, $ */

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
      music: undefined,
      value: 0
    };
  },

  onrender: function() {
    var self = this;
    this.audio = new Audio();
    this.audio.src = 'http://7xq131.com1.z0.glb.clouddn.com/Preparation.mp3';
    this.audio.play();

    // 时间更新
    this.audio.addEventListener('timeupdate', function(e) {
      var val = this.currentTime / this.duration;
      self.set('value', val);
    });

    this.slide = this.findComponent('Slide');
    this.slide.on('value-chage', function() {
      var val = this.get('value');

      // 拖拽不更新时间
      if (!this.get('draging')) {
        self.audio.currentTime = self.audio.duration * val;
      }
    });

    this.slide.on('drag-end', function() {
      var val = this.get('value');

      // 拖拽不更新时间
      if (!this.get('draging')) {
        self.audio.currentTime = self.audio.duration * val;
      }
    });
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
      direction: 'horizontal', // || 'vertical',
      draging: false, // draging now
      value: 0 // 0 - 1
    };
  },

  // 拖拽开始
  handleMousedown: function() {
    var self = this;
    var node = this.event.node;
    var $btn = $(node);
    var $bar = $btn.parent();
    var $barBase = $btn.closest('.bar-base');
    var direction = this.get('direction');
    this.set('draging', true);

    // add on document
    $(document).on('mousemove.ractive.slide', function(e) {
      var val;
      if (direction === 'horizontal') {
        val = (e.clientX - $barBase.offset().left) / $barBase.width();
      } else if (direction === 'vertical') {
        val = ($barBase.offset().top + $barBase.height() - e.clientY) / $barBase.height();
      }
      if (val < 0) val = 0;
      if (val > 1) val = 1;
      self.set('value', val);
      self.fire('value-chage');
    });

    $(document).one('mouseup', function() {
      $(document).off('mousemove.ractive.slide');
      self.set('draging', false);
      self.fire('drag-end'); // 拖拽结束
    });
  },

  handleBarBaseClick: function() {
    var self = this;
    var e = this.event.original;
    var node = this.event.node;
    var $barBase = $(node);
    var $bar = $barBase.find('.--bar');
    var direction = this.get('direction');

    var val;
    if (direction === 'horizontal') {
      val = (e.clientX - $barBase.offset().left) / $barBase.width();
    } else if (direction === 'vertical') {
      val = ($barBase.offset().top + $barBase.height() - e.clientY) / $barBase.height();
    }
    if (val < 0) val = 0;
    if (val > 1) val = 1;
    self.set('value', val);
    self.fire('value-chage');
  }
});

Ractive.components.Slide = Slide;
module.exports = Slide;
},{"./templates/slide.html":4}],3:[function(require,module,exports){
module.exports = "<div class=\"a-player\">\n  <div class=\"--cover\" style='background-image: url(\"http://7xq131.com1.z0.glb.clouddn.com/Preparation.jpg\");'>\n    <div class=\"--btn\">\n    </div>\n  </div>\n  <div class=\"--controler\">\n    <!-- 作者 -->\n    <div class='--info'>\n      ABCD - EFG\n    </div>\n\n    <!-- 歌词 -->\n    <div class=\"--lyric\">\n      hello world\n    </div>\n\n    <!-- pregress -->\n    <div class=\"--status\">\n      <div class=\"--slide\">\n        <Slide value='{{ value }}' />\n      </div>\n      <div class=\"--others\">\n        <span class=\"--time\">\n          12:00 / 12:34\n        </span>\n        <span class=\"--volume\">\n          x\n        </span>\n        <span class=\"--loop-control\">\n          y\n        </span>\n      </div>\n    </div>\n  </div>\n</div>";

},{}],4:[function(require,module,exports){
module.exports = "<div class=\"bar-base __{{ direction }}\" on-click='handleBarBaseClick()'>\n  <div class=\"--bar\" style='width: {{ value * 100 }}%'>\n    <div class=\"--btn {{#if draging}}__drag{{/if}}\" on-mousedown='handleMousedown()'>\n    </div>\n  </div>\n</div>";

},{}]},{},[1]);
