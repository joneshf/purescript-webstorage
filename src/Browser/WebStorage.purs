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
  import Data.Function

  class Storage s where
    clear :: s -> s
    getItem :: forall v. s -> String -> Maybe v
    key :: s -> Number -> Maybe String
    length :: s -> Number
    removeItem :: s -> String -> s
    setItem :: forall v. s -> String -> v -> s

  instance storageLocalStorage :: Storage LocalStorage where
    length _ = unsafeLength localStorage
    key _ n = runFn2 unsafeKey localStorage n
    getItem _ k = runFn2 unsafeGetItem localStorage k
    setItem _ k v = runFn3 unsafeSetItem localStorage k v
    removeItem _ k = runFn2 unsafeRemoveItem localStorage k
    clear _ = unsafeClear localStorage

  instance storageSessionStorage :: Storage SessionStorage where
    length _ = unsafeLength sessionStorage
    key _ n = runFn2 unsafeKey sessionStorage n
    getItem _ k = runFn2 unsafeGetItem sessionStorage k
    setItem _ k v = runFn3 unsafeSetItem sessionStorage k v
    removeItem _ k = runFn2 unsafeRemoveItem sessionStorage k
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
    "function unsafeKey(storage,num) {\
    \  return null2Maybe(storage.key(num));\
    \}" :: forall storage. Fn2 storage Number (Maybe String)

  foreign import unsafeGetItem
    "function unsafeGetItem(storage,str) {\
    \  return null2Maybe(storage.getItem(str));\
    \}" :: forall storage v. Fn2 storage String (Maybe v)

  foreign import unsafeSetItem
    "function unsafeSetItem(storage,str,val) {\
    \  storage.setItem(str, val);\
    \  return storage;\
    \}" :: forall storage v. Fn3 storage String v storage

  foreign import unsafeRemoveItem
    "function unsafeRemoveItem(storage,str) {\
    \  storage.removeItem(str);\
    \  return storage;\
    \}" :: forall storage. Fn2 storage String storage

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
