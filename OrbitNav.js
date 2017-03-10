let orbitnav = (function() {
  let isCollapsed = true;
  let distance;
  let navBtns;
  let container;
  let closeBtns;
  let spinOut;

  return {
    initialize: function(opt) {
      if (typeof opt != 'object') {
        opt = {};
      }
      let options = {
        distance: 150,
        buttonClass: 'orbit-nav-btn',
        closeButton: 'orbit-close-btn',
        container: 'orbit-nav-container',
        spinOut: true,
      };

      for (let key in opt) {
        if (options.hasOwnProperty(key)) {
          options[key] = opt[key];
        }
      }

      distance = options.distance;
      navBtns = document.getElementsByClassName(options.buttonClass);
      closeBtns = document.getElementsByClassName(options.closeButton);
      container = document.getElementById(options.container);
      spinOut = options.spinOut;

      for (let btn of closeBtns) {
        btn.addEventListener('click', function() {
          orbitnav.collapse();
        });
      }
    },
    show: function() {
      container.classList.remove('hidden');
      setTimeout(function() {
        container.style.opacity = 1;

        for (let i = 0; i < navBtns.length; i++) {
          let degrees = (((2 / navBtns.length * i) + 1) *
            Math.PI) + (Math.PI / 2);
          let transX = Math.cos(degrees) * distance;
          let transY = Math.sin(degrees) * distance;

          navBtns[i].style.transform =
            'translate(' + transX + '%,' + transY + '%) ' +
            'scale(1)';
          if (spinOut) {
            navBtns[i].style.transform += ' rotate(0deg)';
          }
          navBtns[i].classList.add('out');
        }
      });

      isCollapsed = false;
    },

    collapse: function() {
      let dur = parseFloat(window.getComputedStyle(closeBtns[0]).getPropertyValue('transition-duration')) * 1000;
      container.style.opacity = 0;
      
      setTimeout(function() {
        container.classList.add('hidden');
      }, dur);

      for (let btn of navBtns) {
        btn.style.transform = 'translate(0,0) scale(0.5)';
        if (spinOut) {
          btn.style.transform += ' rotate(180deg)';
        }
        btn.classList.remove('out');
      }
      isCollapsed = true;
    },
    toggle: function() {
      if (!isCollapsed) {
        this.collapse();
      }
      else {
        this.show();
      }
    },
  };
})();
