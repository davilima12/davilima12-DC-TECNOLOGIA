$(function () {
  'use strict';

  var pageResetForm = $('.auth-login-form');

  if (pageResetForm.length) {
    pageResetForm.validate({
      rules: {
        email: {
          required: true,
        },
        password: {
          required: true,
        },
      },
    });
  }
});
