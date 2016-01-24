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