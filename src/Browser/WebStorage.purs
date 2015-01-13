module Browser.WebStorage
  ( Storage
  , LocalStorage(..)
  , SessionStorage(..)
  , WebStorage()
  , EffWebStorage()
  , localStorage
  , sessionStorage
  , clear
  , getItem
  , key
  , length
  , removeItem
  , setItem
  ) where

  import Control.Monad.Eff
  import Data.Maybe
  import Data.Function

  foreign import data WebStorage :: !
  type EffWebStorage eff = Eff (webStorage :: WebStorage | eff)

  class Storage s where
    clear :: forall eff. s -> EffWebStorage eff Unit
    getItem :: forall eff v. s -> String -> EffWebStorage eff (Maybe v)
    key :: forall eff. s -> Number -> EffWebStorage eff (Maybe String)
    length :: forall eff. s -> EffWebStorage eff Number
    removeItem :: forall eff. s -> String -> EffWebStorage eff Unit
    setItem :: forall eff v. s -> String -> v -> EffWebStorage eff Unit

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
    \  return function(){\
    \    return storage.length;\
    \  }\
    \}" :: forall eff storage. storage -> EffWebStorage eff Number

  foreign import unsafeKey
    "function unsafeKey(storage,num) {\
    \  return function(){\
    \    return null2Maybe(storage.key(num));\
    \  }\
    \}" :: forall eff storage. Fn2 storage Number (EffWebStorage eff (Maybe String))

  foreign import unsafeGetItem
    "function unsafeGetItem(storage,str) {\
    \  return function(){\
    \    return null2Maybe(storage.getItem(str));\
    \  }\
    \}" :: forall eff storage v. Fn2 storage String (EffWebStorage eff (Maybe v))

  foreign import unsafeSetItem
    "function unsafeSetItem(storage,str,val) {\
    \  return function(){\
    \    storage.setItem(str, val);\
    \  }\
    \}" :: forall eff storage v. Fn3 storage String v (EffWebStorage eff Unit)

  foreign import unsafeRemoveItem
    "function unsafeRemoveItem(storage,str) {\
    \  return function(){\
    \    storage.removeItem(str);\
    \  }\
    \}" :: forall eff storage. Fn2 storage String (EffWebStorage eff Unit)

  foreign import unsafeClear
    "function unsafeClear(storage) {\
    \  return function(){\
    \    storage.clear();\
    \  }\
    \}" :: forall eff storage. storage -> EffWebStorage eff Unit

  foreign import null2Maybe
    "function null2Maybe(n) {\
    \  return n == null ? nothing : just(n);\
    \}" :: forall a. a -> Maybe a

  -- psc is too smart for its own good.
  -- we need to keep an explicit use of something in `Data.Maybe` so that it wont eliminate it.
  nothing = Nothing
  just = Just
