'use strict';

angular
  .module('app.wsse', [])
  .factory('wsseservice', wsseservice);
  
function wsseservice() {

  var service = {};
  service.generateCreatedDate = generateCreatedDate;
  service.generateNonce = generateNonce;
  service.generateEncodedPassword = generateEncodedPassword;
  service.generatePasswordDigest = generatePasswordDigest;
  service.getWSSEHeader = getWSSEHeader;

  return service;

  function generateCreatedDate() {
    return new Date().toISOString();
  }

  function generateNonce() {
    var nonce;
    nonce = Math.random().toString(36).substring(2);
    return CryptoJS.enc.Utf8.parse(nonce).toString(CryptoJS.enc.Base64);
  }

  function generateEncodedPassword(password, salt, iteration) {
    var salted = password + '{' + salt + '}';
    var digest = CryptoJS.SHA512(salted);

    for (var i = 1; i < iteration; i++) {
      digest = CryptoJS.SHA512(digest.concat(CryptoJS.enc.Utf8.parse(salted)));
    }

    digest = digest.toString(CryptoJS.enc.Base64);

    return digest;
  }

  function generatePasswordDigest(nonce, createdDate, encodedPassword) {
    var digest, nonce64;
    nonce64 = CryptoJS.enc.Base64.parse(nonce);
    digest = nonce64.concat(CryptoJS.enc.Utf8.parse(createdDate).concat(CryptoJS.enc.Utf8.parse(encodedPassword)));
    return CryptoJS.SHA1(digest).toString(CryptoJS.enc.Base64);
  }

  function getWSSEHeader(username, password) {
    var createdDate, nonce, passwordDigest;
    nonce = generateNonce();
    createdDate = generateCreatedDate();
    passwordDigest = generatePasswordDigest(nonce, createdDate, password);
    return 'UsernameToken Username="' +
      username +
      '", PasswordDigest="' +
      passwordDigest +
      '", Nonce="' +
      nonce +
      '", Created="' +
      createdDate +
      '"';
  }

}