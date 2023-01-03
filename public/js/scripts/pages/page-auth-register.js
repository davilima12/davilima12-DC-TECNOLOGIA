$(function () {
  'use strict';

  var pageResetForm = $('.auth-register-form');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        username: {
          required: true,
        },
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
    });
  }
});
