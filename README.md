# Module Documentation

## Module Browser.WebStorage

### Types


    type EffWebStorage eff = Eff (webStorage :: WebStorage | eff)


    data LocalStorage :: *


    data SessionStorage :: *


    data WebStorage :: !


### Type Classes


    class Storage s where

      clear :: forall eff. s -> EffWebStorage eff Unit

      getItem :: forall eff. s -> String -> EffWebStorage eff (Maybe String)

      key :: forall eff. s -> Number -> EffWebStorage eff (Maybe String)

      length :: forall eff. s -> EffWebStorage eff Number

      removeItem :: forall eff. s -> String -> EffWebStorage eff Unit

      setItem :: forall eff. s -> String -> String -> EffWebStorage eff Unit


### Type Class Instances


    instance storageLocalStorage :: Storage LocalStorage


    instance storageSessionStorage :: Storage SessionStorage


### Values


    localStorage :: LocalStorage


    sessionStorage :: SessionStorage



