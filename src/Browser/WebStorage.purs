module Browser.WebStorage
  ( Storage
  , LocalStorage(..)
  , SessionStorage(..)
  , clear
  , getItem
  , key
  , length
  , removeItem
  , setItem
  ) where

  import Data.Maybe

  class Storage s where
    clear :: s
    getItem :: forall v. String -> Maybe v
    key :: Number -> Maybe String
    length :: Number
    removeItem :: String -> s
    setItem :: forall v. String -> v -> s

  instance storageLocalStorage :: Storage LocalStorage where
    length = unsafeLength localStorage
    key = unsafeKey localStorage
    getItem = unsafeGetItem localStorage
    setItem = unsafeSetItem localStorage
    removeItem = unsafeRemoveItem localStorage
    clear = unsafeClear localStorage

  instance storageSessionStorage :: Storage SessionStorage where
    length = unsafeLength sessionStorage
    key = unsafeKey sessionStorage
    getItem = unsafeGetItem sessionStorage
    setItem = unsafeSetItem sessionStorage
    removeItem = unsafeRemoveItem sessionStorage
    clear = unsafeClear sessionStorage

  foreign import data LocalStorage :: *
  foreign import data SessionStorage :: *

  foreign import localStorage
    "var localStorage = window.localStorage" :: LocalStorage
  foreign import sessionStorage
    "var sessionStorage = window.sessionStorage" :: SessionStorage

  foreign import unsafeLength
    "function unsafeLength(storage) {\
    \  return storage.length;\
    \}" :: forall storage. storage -> Number

  foreign import unsafeKey
    "function unsafeKey(storage) {\
    \  return function(num) {\
    \    return null2Maybe(storage.key(num));\
    \  }\
    \}" :: forall storage. storage -> Number -> Maybe String

  foreign import unsafeGetItem
    "function unsafeGetItem(storage) {\
    \  return function(str) {\
    \    return null2Maybe(storage.getItem(str));\
    \  }\
    \}" :: forall storage v. storage -> String -> Maybe v

  foreign import unsafeSetItem
    "function unsafeSetItem(storage) {\
    \  return function(str) {\
    \    return function(val) {\
    \      storage.setItem(str, val);\
    \      return storage;\
    \    }\
    \  }\
    \}" :: forall storage v. storage -> String -> v -> storage

  foreign import unsafeRemoveItem
    "function unsafeRemoveItem(storage) {\
    \  return function(str) {\
    \    storage.removeItem(str);\
    \    return storage;\
    \  }\
    \}" :: forall storage. storage -> String -> storage

  foreign import unsafeClear
    "function unsafeClear(storage) {\
    \  storage.clear();\
    \  return storage;\
    \}" :: forall storage. storage -> storage

  foreign import null2Maybe
    "function null2Maybe(n) {\
    \  return n == null ? Data_Maybe.Nothing : Data_Maybe.Just(n);\
    \}" :: forall a. a -> Maybe a

  -- psc is too smart for its own good.
  -- we need to keep an explicit use of something in `Data.Maybe` so that it wont eliminate it.
  foo = Nothing
