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