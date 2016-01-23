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