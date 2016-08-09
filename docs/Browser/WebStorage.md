## Module Browser.WebStorage

#### `WebStorage`

``` purescript
data WebStorage :: !
```

#### `EffWebStorage`

``` purescript
type EffWebStorage eff = Eff (webStorage :: WebStorage | eff)
```

#### `Storage`

``` purescript
class Storage s where
  clear :: forall eff. s -> EffWebStorage eff Unit
  getItem :: forall eff. s -> String -> EffWebStorage eff (Maybe String)
  key :: forall eff. s -> Number -> EffWebStorage eff (Maybe String)
  length :: forall eff. s -> EffWebStorage eff Number
  removeItem :: forall eff. s -> String -> EffWebStorage eff Unit
  setItem :: forall eff. s -> String -> String -> EffWebStorage eff Unit
```

##### Instances
``` purescript
Storage LocalStorage
Storage SessionStorage
```

#### `LocalStorage`

``` purescript
data LocalStorage :: *
```

##### Instances
``` purescript
Storage LocalStorage
```

#### `SessionStorage`

``` purescript
data SessionStorage :: *
```

##### Instances
``` purescript
Storage SessionStorage
```

#### `localStorage`

``` purescript
localStorage :: LocalStorage
```

#### `sessionStorage`

``` purescript
sessionStorage :: SessionStorage
```


