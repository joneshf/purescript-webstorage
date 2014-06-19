module Browser.WebStorage
  ( Storage
  , LocalStorage(..)
  , SessionStorage(..)
  , localStorage
  , sessionStorage
  , clear
  , getItem
  , key
  , length
  , removeItem
  , setItem
  ) where

  import Data.Maybe

  class Storage s where
    clear :: s -> s
    getItem :: forall v. s -> String -> Maybe v
    key :: s -> Number -> Maybe String
    length :: s -> Number
    removeItem :: s -> String -> s
    setItem :: forall v. s -> String -> v -> s

  instance storageLocalStorage :: Storage LocalStorage where
    length _ = unsafeLength localStorage
    key _ = unsafeKey localStorage
    getItem _ = unsafeGetItem localStorage
    setItem _ = unsafeSetItem localStorage
    removeItem _ = unsafeRemoveItem localStorage
    clear _ = unsafeClear localStorage

  instance storageSessionStorage :: Storage SessionStorage where
    length _ = unsafeLength sessionStorage
    key _ = unsafeKey sessionStorage
    getItem _ = unsafeGetItem sessionStorage
    setItem _ = unsafeSetItem sessionStorage
    removeItem _ = unsafeRemoveItem sessionStorage
    clear _ = unsafeClear sessionStorage

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
    \  return n == null ? nothing : just(n);\
    \}" :: forall a. a -> Maybe a

  -- psc is too smart for its own good.
  -- we need to keep an explicit use of something in `Data.Maybe` so that it wont eliminate it.
  nothing = Nothing
  just = Just
