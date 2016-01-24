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