$(document).ready(function() {

  // Variables
  var $codeSnippets = $('.code-example-body'),
      $nav = $('.navbar'),
      $body = $('body'),
      $window = $(window),
      $popoverLink = $('[data-popover]'),
      navOffsetTop = $nav.offset().top,
      $document = $(document),
      entityMap = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': '&quot;',
          "'": '&#39;',
          "/": '&#x2F;'
      }

  function init() {
      $window.on('scroll', onScroll)
      $window.on('resize', resize)
      $popoverLink.on('click', openPopover)
      $document.on('click', closePopover)
      $('a[href^="#"]').on('click', smoothScroll)
      buildSnippets();
  }

  function smoothScroll(e) {
      e.preventDefault();
      $(document).off("scroll");
      var target = this.hash,
          menu = target;
      $target = $(target);
      $('html, body').stop().animate({
          'scrollTop': $target.offset().top - 40
      }, 0, 'swing', function() {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
      });
  }

  function openPopover(e) {
      e.preventDefault()
      closePopover();
      var popover = $($(this).data('popover'));
      popover.toggleClass('open')
      e.stopImmediatePropagation();
  }

  function closePopover(e) {
      if ($('.popover.open').length > 0) {
          $('.popover').removeClass('open')
      }
  }

  $("#button").click(function() {
      $('html, body').animate({
          scrollTop: $("#elementtoScrollToID").offset().top
      }, 2000);
  });

  function resize() {
      $body.removeClass('has-docked-nav')
      navOffsetTop = $nav.offset().top
      onScroll()
  }

  function onScroll() {
      if (navOffsetTop < $window.scrollTop() && !$body.hasClass('has-docked-nav')) {
          $body.addClass('has-docked-nav')
      }
      if (navOffsetTop > $window.scrollTop() && $body.hasClass('has-docked-nav')) {
          $body.removeClass('has-docked-nav')
      }
  }

  function escapeHtml(string) {
      return String(string).replace(/[&<>"'\/]/g, function(s) {
          return entityMap[s];
      });
  }

  function buildSnippets() {
      $codeSnippets.each(function() {
          var newContent = escapeHtml($(this).html())
          $(this).html(newContent)
      })
  }


  init();



  /*
  // CONTACT FORM
  $('#contact-form').submit(function(e) {
    e.preventDefault();

    $.ajax({
      url: 'https://formspree.io/mctongasoa@yahoo.fr',
      method: 'POST',
      data: { message: $('form').serialize() },
      dataType: 'json'
    }).done(function(response) {
      $('#success').addClass('expand');
      $('#contact-form')
        .find('select[value], input[type=email], textarea')
        .val('');
    });
  });

  $('#close').click(function() {
    $('#success').removeClass('expand');
  });

  ////////////////////////////////////////////////////////////////////
  var fields = {};
  document.addEventListener("DOMContentLoaded", function() {
    fields.recipientInput = document.getElementById('recipientInput');
    fields.email = document.getElementById('emailInput');
    fields.message = document.getElementById('message');
  })

  function isNotEmpty(value) {
    if (value == null || typeof value == 'undefined') return false;
    return (value.length > 0);
  }

  function isEmail(email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regex.test(String(email).toLowerCase());
  }

  function fieldValidation(field, validationFunction) {
    if (field == null) return false;

    let isFieldValid = validationFunction(field.value)
    if (!isFieldValid) {
       field.className = 'u-full-width placeholderRed';
    } else {
       field.className = 'u-full-width';
    }

    return isFieldValid;
  }

  function isValid() {
    var valid = true;

    valid &= fieldValidation(fields.email, isEmail);
    valid &= fieldValidation(fields.message, isNotEmpty);


    return valid;
  }

  class User {
    constructor(recipientInput, email, message) {
        this.recipientInput = recipientInput;
        this.email = email;
        this.message = message;
    }
  }

  
  /*
  function sendContact() {
    if (isValid()) {
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
        alert('Merci le message a bien été envoyé!')
    } else {
        alert('Il y a eu une erreur.')
    }
  }
  */

  window.onload = function() {
      document.getElementById('contact-form').addEventListener('submit', function(event) {
          event.preventDefault();
          // generate a five digit number for the contact_number variable
          this.contact_number.value = Math.random() * 100000 | 0;
          // these IDs from the previous steps

          emailjs.sendForm('service_yglwnim', 'template_72xdd7o', this)
              .then(function() {
                  console.log('SUCCESS!');
              }, function(error) {
                  console.log('FAILED...', error);
              });


      });
  }
});