"use strict";

exports.localStorage = window.localStorage;
exports.sessionStorage = window.sessionStorage;

exports.unsafeLength= function(storage) {
  return function(){
    return storage.length;
  }
};

exports.unsafeKey = function(null2Maybe,storage,num) {
  return function(){
    return null2Maybe(storage.key(num));
  }
};

exports.unsafeGetItem = function(null2Maybe,storage,str) {
  return function(){
    return null2Maybe(storage.getItem(str));
  }
};

exports.unsafeSetItem = function(storage,str,val) {
  return function(){
    storage.setItem(str, val);
    return {};
  }
};

exports.unsafeRemoveItem = function(storage,str) {
  return function(){
    storage.removeItem(str);
    return {};
  }
};

exports.unsafeClear = function(storage) {
  return function(){
    storage.clear();
    return {};
  }
};

exports.null2MaybeImpl = function(just, nothing, n) {
  return n == null ? nothing : just(n);
};
