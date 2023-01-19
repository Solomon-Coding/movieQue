$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
  
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
  
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');
    
        $close.addEventListener('click', () => {
          closeModal($target);
        });
      });
    
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.key === "Escape") {
            closeAllModals();
        }
    });

    function closeModal($el) {
        $el.classList.remove('is-active');
      }
    
    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
        });
    }

});
