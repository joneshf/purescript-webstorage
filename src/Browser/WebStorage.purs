module Browser.WebStorage
  ( class Storage
  , LocalStorage(..)
  , StorageKey(..)
  , SessionStorage(..)
  , WEB_STORAGE()
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

import Control.Monad.Eff (Eff, kind Effect)
import Data.Function.Uncurried (Fn3, Fn2, runFn3, runFn2)
import Data.Maybe (Maybe(..))

foreign import data WEB_STORAGE :: Effect
type EffWebStorage eff = Eff (webStorage :: WEB_STORAGE | eff)

newtype StorageKey = StorageKey String

class Storage s where
    clear :: forall eff. s -> EffWebStorage eff Unit
    getItem :: forall eff. s -> StorageKey -> EffWebStorage eff (Maybe String)
    key :: forall eff. s -> Int -> EffWebStorage eff (Maybe StorageKey)
    length :: forall eff. s -> EffWebStorage eff Int
    removeItem :: forall eff. s -> StorageKey -> EffWebStorage eff Unit
    setItem :: forall eff. s -> StorageKey -> String -> EffWebStorage eff Unit

instance storageLocalStorage :: Storage LocalStorage where
    length _ = unsafeLength localStorage
    key _ n = runFn3 unsafeKey (null2Maybe StorageKey) localStorage n
    getItem _ k = runFn3 unsafeGetItem (null2Maybe id) localStorage k
    setItem _ k v = runFn3 unsafeSetItem localStorage k v
    removeItem _ k = runFn2 unsafeRemoveItem localStorage k
    clear _ = unsafeClear localStorage

instance storageSessionStorage :: Storage SessionStorage where
    length _ = unsafeLength sessionStorage
    key _ n = runFn3 unsafeKey (null2Maybe StorageKey) sessionStorage n
    getItem _ k = runFn3 unsafeGetItem (null2Maybe id) sessionStorage k
    setItem _ k v = runFn3 unsafeSetItem sessionStorage k v
    removeItem _ k = runFn2 unsafeRemoveItem sessionStorage k
    clear _ = unsafeClear sessionStorage

foreign import data LocalStorage :: Type
foreign import data SessionStorage :: Type

foreign import localStorage :: LocalStorage
foreign import sessionStorage :: SessionStorage

foreign import unsafeLength
    :: forall eff storage. storage -> EffWebStorage eff Int

foreign import unsafeKey
    :: forall eff storage. Fn3 (String -> Maybe StorageKey) storage Int (EffWebStorage eff (Maybe StorageKey))

foreign import unsafeGetItem
    :: forall eff storage. Fn3 (String -> Maybe String) storage StorageKey (EffWebStorage eff (Maybe String))

foreign import unsafeSetItem
    :: forall eff storage. Fn3 storage StorageKey String (EffWebStorage eff Unit)

foreign import unsafeRemoveItem
    :: forall eff storage. Fn2 storage StorageKey (EffWebStorage eff Unit)

foreign import unsafeClear
    :: forall eff storage. storage -> EffWebStorage eff Unit

foreign import null2MaybeImpl
    :: forall a b. Fn3 (a -> Maybe b) (Maybe b) a (Maybe b)

null2Maybe :: forall a b. (a -> b) -> a -> Maybe b
null2Maybe f n = runFn3 null2MaybeImpl (f >>> Just) Nothing n
