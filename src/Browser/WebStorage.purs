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

  import Prelude
  import Control.Monad.Eff
  import Data.Maybe
  import Data.Function

  foreign import data WebStorage :: !
  type EffWebStorage eff = Eff (webStorage :: WebStorage | eff)

  class Storage s where
    clear :: forall eff. s -> EffWebStorage eff Unit
    getItem :: forall eff. s -> String -> EffWebStorage eff (Maybe String)
    key :: forall eff. s -> Number -> EffWebStorage eff (Maybe String)
    length :: forall eff. s -> EffWebStorage eff Number
    removeItem :: forall eff. s -> String -> EffWebStorage eff Unit
    setItem :: forall eff. s -> String -> String -> EffWebStorage eff Unit

  instance storageLocalStorage :: Storage LocalStorage where
    length _ = unsafeLength localStorage
    key _ n = runFn3 unsafeKey null2Maybe localStorage n
    getItem _ k = runFn3 unsafeGetItem null2Maybe localStorage k
    setItem _ k v = runFn3 unsafeSetItem localStorage k v
    removeItem _ k = runFn2 unsafeRemoveItem localStorage k
    clear _ = unsafeClear localStorage

  instance storageSessionStorage :: Storage SessionStorage where
    length _ = unsafeLength sessionStorage
    key _ n = runFn3 unsafeKey null2Maybe sessionStorage n
    getItem _ k = runFn3 unsafeGetItem null2Maybe sessionStorage k
    setItem _ k v = runFn3 unsafeSetItem sessionStorage k v
    removeItem _ k = runFn2 unsafeRemoveItem sessionStorage k
    clear _ = unsafeClear sessionStorage

  foreign import data LocalStorage :: *
  foreign import data SessionStorage :: *

  foreign import localStorage :: LocalStorage
  foreign import sessionStorage :: SessionStorage

  foreign import unsafeLength
    :: forall eff storage. storage -> EffWebStorage eff Number

  foreign import unsafeKey
    :: forall eff storage. Fn3 (String -> Maybe String) storage Number (EffWebStorage eff (Maybe String))

  foreign import unsafeGetItem
    :: forall eff storage v. Fn3 (v -> Maybe v) storage String (EffWebStorage eff (Maybe v))

  foreign import unsafeSetItem
    :: forall eff storage v. Fn3 storage String v (EffWebStorage eff Unit)

  foreign import unsafeRemoveItem
    :: forall eff storage. Fn2 storage String (EffWebStorage eff Unit)

  foreign import unsafeClear
    :: forall eff storage. storage -> EffWebStorage eff Unit

  foreign import null2MaybeImpl
    :: forall a. Fn3 (a -> Maybe a) (Maybe a) a (Maybe a)

  null2Maybe :: forall a. a -> Maybe a
  null2Maybe n = runFn3 null2MaybeImpl Just Nothing n
