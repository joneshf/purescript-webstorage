module Browser.WebStorage where

  import Data.Maybe

  class Storage s where
    length :: Number
    key :: Number -> Maybe String
    getItem :: forall v. String -> Maybe v
    setItem :: forall v. String -> v -> s
    removeItem :: String -> s
    clear :: s

  instance storageLocalStorage :: Storage LocalStorage where
    length = localLength localStorage
    key = localKey localStorage
    getItem = localGetItem localStorage
    setItem = localSetItem localStorage
    removeItem = localRemoveItem localStorage
    clear = localClear localStorage

  instance storageSessionStorage :: Storage SessionStorage where
    length = sessionLength sessionStorage
    key = sessionKey sessionStorage
    getItem = sessionGetItem sessionStorage
    setItem = sessionSetItem sessionStorage
    removeItem = sessionRemoveItem sessionStorage
    clear = sessionClear sessionStorage

  foreign import data LocalStorage :: *
  foreign import data SessionStorage :: *

  foreign import localStorage
    "var localStorage = window.localStorage" :: LocalStorage

  foreign import localLength
    "function localLength(ls) {\
    \  return ls.length;\
    \}" :: LocalStorage -> Number

  foreign import localKey
    "function localKey(ls) {\
    \  return function(num) {\
    \    return null2Maybe(ls.key(num));\
    \  }\
    \}" :: LocalStorage -> Number -> Maybe String

  foreign import localGetItem
    "function localGetItem(ls) {\
    \  return function(str) {\
    \    return null2Maybe(ls.getItem(str));\
    \  }\
    \}" :: forall v. LocalStorage -> String -> Maybe v

  foreign import localSetItem
    "function localSetItem(ls) {\
    \  return function(str) {\
    \    return function(val) {\
    \      ls.setItem(str, val);\
    \      return ls;\
    \    }\
    \  }\
    \}" :: forall v. LocalStorage -> String -> v -> LocalStorage

  foreign import localRemoveItem
    "function localRemoveItem(ls) {\
    \  return function(str) {\
    \    ls.removeItem(str);\
    \    return ls;\
    \  }\
    \}" :: LocalStorage -> String -> LocalStorage

  foreign import localClear
    "function localClear(ls) {\
    \  ls.clear();\
    \  return ls;\
    \}" :: LocalStorage -> LocalStorage

  foreign import sessionStorage
    "var sessionStorage = window.sessionStorage" :: SessionStorage

  foreign import sessionLength
    "function sessionLength(ss) {\
    \  return ss.length;\
    \}" :: SessionStorage -> Number

  foreign import sessionKey
    "function sessionKey(ss) {\
    \  return function(num) {\
    \    return null2Maybe(ss.key(num));\
    \  }\
    \}" :: SessionStorage -> Number -> Maybe String

  foreign import sessionGetItem
    "function sessionGetItem(ss) {\
    \  return function(str) {\
    \    return null2Maybe(ss.getItem(str));\
    \  }\
    \}" :: forall v. SessionStorage -> String -> Maybe v

  foreign import sessionSetItem
    "function sessionSetItem(ss) {\
    \  return function(str) {\
    \    return function(val) {\
    \      ss.setItem(str, val);\
    \      return ss;\
    \    }\
    \  }\
    \}" :: forall v. SessionStorage -> String -> v -> SessionStorage

  foreign import sessionRemoveItem
    "function sessionRemoveItem(ss) {\
    \  return function(str) {\
    \    ss.removeItem(str);\
    \    return ss;\
    \  }\
    \}" :: SessionStorage -> String -> SessionStorage

  foreign import sessionClear
    "function sessionClear(ss) {\
    \  ss.clear();\
    \  return ss;\
    \}" :: SessionStorage -> SessionStorage

  foreign import null2Maybe
    "function null2Maybe(n) {\
    \  return n === null ? Data_Maybe.Nothing : Data_Maybe.Just(n);\
    \}" :: forall a. a -> Maybe a
