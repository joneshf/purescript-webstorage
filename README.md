# Module Documentation

## Module Browser.WebStorage

### Types

    data LocalStorage :: *

    data SessionStorage :: *


### Type Classes

    class Storage s where
      clear :: s -> s
      getItem :: forall v. s -> String -> Maybe v
      key :: s -> Number -> Maybe String
      length :: s -> Number
      removeItem :: s -> String -> s
      setItem :: forall v. s -> String -> v -> s


### Type Class Instances

    instance storageLocalStorage :: Storage LocalStorage

    instance storageSessionStorage :: Storage SessionStorage


### Values

    localStorage :: LocalStorage

    sessionStorage :: SessionStorage



