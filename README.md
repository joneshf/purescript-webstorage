# Module Documentation

## Module Browser.WebStorage

### Types

    data LocalStorage :: *

    data SessionStorage :: *


### Type Classes

    class Storage s where
      clear :: s
      getItem :: forall v. Prim.String -> Maybe v
      key :: Prim.Number -> Maybe Prim.String
      length :: Prim.Number
      removeItem :: Prim.String -> s
      setItem :: forall v. Prim.String -> v -> s


### Type Class Instances

    instance storageLocalStorage :: Storage LocalStorage

    instance storageSessionStorage :: Storage SessionStorage


### Values



