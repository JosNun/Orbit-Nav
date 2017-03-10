'use strict';
let container;

window.onload = function() {
  orbitnav.initialize({
    distance: 125,
    spinOut: false,
  });
  container = document.getElementById('orbit-nav-container');
};
