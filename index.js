var PS = PS || {};
PS.Prelude = (function () {
    "use strict";
    var Unit = function (value0) {
        return {
            ctor: "Prelude.Unit", 
            values: [ value0 ]
        };
    };
    var LT = {
        ctor: "Prelude.LT", 
        values: [  ]
    };
    var GT = {
        ctor: "Prelude.GT", 
        values: [  ]
    };
    var EQ = {
        ctor: "Prelude.EQ", 
        values: [  ]
    };
    function cons(e) {  return function (l) {    return [e].concat(l);  };};
    function showStringImpl(s) {  return JSON.stringify(s);};
    function showNumberImpl(n) {  return n.toString();};
    function showArrayImpl (f) {  return function (xs) {    var ss = [];    for (var i = 0, l = xs.length; i < l; i++) {      ss[i] = f(xs[i]);    }    return '[' + ss.join(',') + ']';  };};
    function numAdd(n1) {  return function(n2) {    return n1 + n2;  };};
    function numSub(n1) {  return function(n2) {    return n1 - n2;  };};
    function numMul(n1) {  return function(n2) {    return n1 * n2;  };};
    function numDiv(n1) {  return function(n2) {    return n1 / n2;  };};
    function numMod(n1) {  return function(n2) {    return n1 % n2;  };};
    function numNegate(n) {  return -n;};
    function refEq(r1) {  return function(r2) {    return r1 === r2;  };};
    function refIneq(r1) {  return function(r2) {    return r1 !== r2;  };};
    function unsafeCompare(n1) {  return function(n2) {    return n1 < n2 ? LT : n1 > n2 ? GT : EQ;  };};
    function numShl(n1) {  return function(n2) {    return n1 << n2;  };};
    function numShr(n1) {  return function(n2) {    return n1 >> n2;  };};
    function numZshr(n1) {  return function(n2) {    return n1 >>> n2;  };};
    function numAnd(n1) {  return function(n2) {    return n1 & n2;  };};
    function numOr(n1) {  return function(n2) {    return n1 | n2;  };};
    function numXor(n1) {  return function(n2) {    return n1 ^ n2;  };};
    function numComplement(n) {  return ~n;};
    function boolAnd(b1) {  return function(b2) {    return b1 && b2;  };};
    function boolOr(b1) {  return function(b2) {    return b1 || b2;  };};
    function boolNot(b) {  return !b;};
    function concatString(s1) {  return function(s2) {    return s1 + s2;  };};
    var $bar$bar = function (dict) {
        return dict["||"];
    };
    var $bar = function (dict) {
        return dict["|"];
    };
    var $up = function (dict) {
        return dict["^"];
    };
    var $greater$greater$eq = function (dict) {
        return dict[">>="];
    };
    var $eq$eq = function (dict) {
        return dict["=="];
    };
    var $less$bar$greater = function (dict) {
        return dict["<|>"];
    };
    var $less$greater = function (dict) {
        return dict["<>"];
    };
    var $less$less$less = function (dict) {
        return dict["<<<"];
    };
    var $greater$greater$greater = function (__dict_Semigroupoid_0) {
        return function (f) {
            return function (g) {
                return $less$less$less(__dict_Semigroupoid_0)(g)(f);
            };
        };
    };
    var $less$times$greater = function (dict) {
        return dict["<*>"];
    };
    var $less$dollar$greater = function (dict) {
        return dict["<$>"];
    };
    var $colon = cons;
    var $div$eq = function (dict) {
        return dict["/="];
    };
    var $div = function (dict) {
        return dict["/"];
    };
    var $minus = function (dict) {
        return dict["-"];
    };
    var $plus$plus = function (__dict_Semigroup_1) {
        return $less$greater(__dict_Semigroup_1);
    };
    var $plus = function (dict) {
        return dict["+"];
    };
    var $times = function (dict) {
        return dict["*"];
    };
    var $amp$amp = function (dict) {
        return dict["&&"];
    };
    var $amp = function (dict) {
        return dict["&"];
    };
    var $percent = function (dict) {
        return dict["%"];
    };
    var $dollar = function (f) {
        return function (x) {
            return f(x);
        };
    };
    var $hash = function (x) {
        return function (f) {
            return f(x);
        };
    };
    var zshr = function (dict) {
        return dict.zshr;
    };
    var unit = Unit({});
    var shr = function (dict) {
        return dict.shr;
    };
    var showUnit = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_1) {
                return "Unit {}";
            }
        };
    };
    var showString = function (_) {
        return {
            "__superclasses": {}, 
            show: showStringImpl
        };
    };
    var showOrdering = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_1) {
                if (_1.ctor === "Prelude.LT") {
                    return "LT";
                };
                if (_1.ctor === "Prelude.GT") {
                    return "GT";
                };
                if (_1.ctor === "Prelude.EQ") {
                    return "EQ";
                };
                throw "Failed pattern match";
            }
        };
    };
    var showNumber = function (_) {
        return {
            "__superclasses": {}, 
            show: showNumberImpl
        };
    };
    var showBoolean = function (_) {
        return {
            "__superclasses": {}, 
            show: function (_1) {
                if (_1) {
                    return "true";
                };
                if (!_1) {
                    return "false";
                };
                throw "Failed pattern match";
            }
        };
    };
    var show = function (dict) {
        return dict.show;
    };
    var showArray = function (__dict_Show_2) {
        return {
            "__superclasses": {}, 
            show: showArrayImpl(show(__dict_Show_2))
        };
    };
    var shl = function (dict) {
        return dict.shl;
    };
    var semigroupoidArr = function (_) {
        return {
            "__superclasses": {}, 
            "<<<": function (f) {
                return function (g) {
                    return function (x) {
                        return f(g(x));
                    };
                };
            }
        };
    };
    var semigroupUnit = function (_) {
        return {
            "__superclasses": {}, 
            "<>": function (_1) {
                return function (_2) {
                    return Unit({});
                };
            }
        };
    };
    var semigroupString = function (_) {
        return {
            "__superclasses": {}, 
            "<>": concatString
        };
    };
    var pure = function (dict) {
        return dict.pure;
    };
    var $$return = function (__dict_Monad_3) {
        return pure(__dict_Monad_3["__superclasses"]["Prelude.Applicative_0"]({}));
    };
    var numNumber = function (_) {
        return {
            "__superclasses": {}, 
            "+": numAdd, 
            "-": numSub, 
            "*": numMul, 
            "/": numDiv, 
            "%": numMod, 
            negate: numNegate
        };
    };
    var not = function (dict) {
        return dict.not;
    };
    var negate = function (dict) {
        return dict.negate;
    };
    var liftM1 = function (__dict_Monad_4) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_4["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                    return $$return(__dict_Monad_4)(f(_1));
                });
            };
        };
    };
    var liftA1 = function (__dict_Applicative_5) {
        return function (f) {
            return function (a) {
                return $less$times$greater(__dict_Applicative_5["__superclasses"]["Prelude.Apply_0"]({}))(pure(__dict_Applicative_5)(f))(a);
            };
        };
    };
    var id = function (dict) {
        return dict.id;
    };
    var flip = function (f) {
        return function (b) {
            return function (a) {
                return f(a)(b);
            };
        };
    };
    var eqUnit = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_1) {
                return function (_2) {
                    return true;
                };
            }, 
            "/=": function (_1) {
                return function (_2) {
                    return false;
                };
            }
        };
    };
    var ordUnit = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqUnit({});
                }
            }, 
            compare: function (_1) {
                return function (_2) {
                    return EQ;
                };
            }
        };
    };
    var eqString = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordString = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqString({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqNumber = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordNumber = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqNumber({});
                }
            }, 
            compare: unsafeCompare
        };
    };
    var eqBoolean = function (_) {
        return {
            "__superclasses": {}, 
            "==": refEq, 
            "/=": refIneq
        };
    };
    var ordBoolean = function (_) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqBoolean({});
                }
            }, 
            compare: function (_1) {
                return function (_2) {
                    if (!_1) {
                        if (!_2) {
                            return EQ;
                        };
                    };
                    if (!_1) {
                        if (_2) {
                            return LT;
                        };
                    };
                    if (_1) {
                        if (_2) {
                            return EQ;
                        };
                    };
                    if (_1) {
                        if (!_2) {
                            return GT;
                        };
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var empty = function (dict) {
        return dict.empty;
    };
    var $$const = function (_1) {
        return function (_2) {
            return _1;
        };
    };
    var complement = function (dict) {
        return dict.complement;
    };
    var compare = function (dict) {
        return dict.compare;
    };
    var $less = function (__dict_Ord_8) {
        return function (a1) {
            return function (a2) {
                return (function (_1) {
                    if (_1.ctor === "Prelude.LT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_8)(a1)(a2));
            };
        };
    };
    var $less$eq = function (__dict_Ord_9) {
        return function (a1) {
            return function (a2) {
                return (function (_1) {
                    if (_1.ctor === "Prelude.GT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_9)(a1)(a2));
            };
        };
    };
    var $greater = function (__dict_Ord_10) {
        return function (a1) {
            return function (a2) {
                return (function (_1) {
                    if (_1.ctor === "Prelude.GT") {
                        return true;
                    };
                    return false;
                })(compare(__dict_Ord_10)(a1)(a2));
            };
        };
    };
    var $greater$eq = function (__dict_Ord_11) {
        return function (a1) {
            return function (a2) {
                return (function (_1) {
                    if (_1.ctor === "Prelude.LT") {
                        return false;
                    };
                    return true;
                })(compare(__dict_Ord_11)(a1)(a2));
            };
        };
    };
    var categoryArr = function (_) {
        return {
            "__superclasses": {
                "Prelude.Semigroupoid_0": function (_) {
                    return semigroupoidArr({});
                }
            }, 
            id: function (x) {
                return x;
            }
        };
    };
    var boolLikeBoolean = function (_) {
        return {
            "__superclasses": {}, 
            "&&": boolAnd, 
            "||": boolOr, 
            not: boolNot
        };
    };
    var eqArray = function (__dict_Eq_6) {
        return {
            "__superclasses": {}, 
            "==": function (_1) {
                return function (_2) {
                    if (_1.length === 0) {
                        if (_2.length === 0) {
                            return true;
                        };
                    };
                    if (_1.length > 0) {
                        var _8 = _1.slice(1);
                        if (_2.length > 0) {
                            var _6 = _2.slice(1);
                            return $amp$amp(boolLikeBoolean({}))($eq$eq(__dict_Eq_6)(_1[0])(_2[0]))($eq$eq(eqArray(__dict_Eq_6))(_8)(_6));
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (xs) {
                return function (ys) {
                    return not(boolLikeBoolean({}))($eq$eq(eqArray(__dict_Eq_6))(xs)(ys));
                };
            }
        };
    };
    var ordArray = function (__dict_Ord_7) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqArray(__dict_Ord_7["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_1) {
                return function (_2) {
                    return (function (_3, _4) {
                        if (_3.length === 0) {
                            if (_4.length === 0) {
                                return EQ;
                            };
                        };
                        if (_3.length === 0) {
                            return LT;
                        };
                        if (_4.length === 0) {
                            return GT;
                        };
                        if (_3.length > 0) {
                            var _8 = _3.slice(1);
                            if (_4.length > 0) {
                                var _6 = _4.slice(1);
                                return (function (_1) {
                                    if (_1.ctor === "Prelude.EQ") {
                                        return compare(ordArray(__dict_Ord_7))(_8)(_6);
                                    };
                                    return _1;
                                })(compare(__dict_Ord_7)(_3[0])(_4[0]));
                            };
                        };
                        throw "Failed pattern match";
                    })(_1, _2);
                };
            }
        };
    };
    var eqOrdering = function (_) {
        return {
            "__superclasses": {}, 
            "==": function (_1) {
                return function (_2) {
                    if (_1.ctor === "Prelude.LT") {
                        if (_2.ctor === "Prelude.LT") {
                            return true;
                        };
                    };
                    if (_1.ctor === "Prelude.GT") {
                        if (_2.ctor === "Prelude.GT") {
                            return true;
                        };
                    };
                    if (_1.ctor === "Prelude.EQ") {
                        if (_2.ctor === "Prelude.EQ") {
                            return true;
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (x) {
                return function (y) {
                    return not(boolLikeBoolean({}))($eq$eq(eqOrdering({}))(x)(y));
                };
            }
        };
    };
    var bitsNumber = function (_) {
        return {
            "__superclasses": {}, 
            "&": numAnd, 
            "|": numOr, 
            "^": numXor, 
            shl: numShl, 
            shr: numShr, 
            zshr: numZshr, 
            complement: numComplement
        };
    };
    var asTypeOf = function (_1) {
        return function (_2) {
            return _1;
        };
    };
    var ap = function (__dict_Monad_12) {
        return function (f) {
            return function (a) {
                return $greater$greater$eq(__dict_Monad_12["__superclasses"]["Prelude.Bind_1"]({}))(f)(function (_1) {
                    return (function (_2) {
                        return $greater$greater$eq(__dict_Monad_12["__superclasses"]["Prelude.Bind_1"]({}))(a)(function (_1) {
                            return $$return(__dict_Monad_12)(_2(_1));
                        });
                    })(_1);
                });
            };
        };
    };
    return {
        Unit: Unit, 
        LT: LT, 
        GT: GT, 
        EQ: EQ, 
        unit: unit, 
        "++": $plus$plus, 
        "<>": $less$greater, 
        not: not, 
        "||": $bar$bar, 
        "&&": $amp$amp, 
        complement: complement, 
        zshr: zshr, 
        shr: shr, 
        shl: shl, 
        "^": $up, 
        "|": $bar, 
        "&": $amp, 
        ">=": $greater$eq, 
        "<=": $less$eq, 
        ">": $greater, 
        "<": $less, 
        compare: compare, 
        refIneq: refIneq, 
        refEq: refEq, 
        "/=": $div$eq, 
        "==": $eq$eq, 
        negate: negate, 
        "%": $percent, 
        "/": $div, 
        "*": $times, 
        "-": $minus, 
        "+": $plus, 
        ap: ap, 
        liftM1: liftM1, 
        "return": $$return, 
        ">>=": $greater$greater$eq, 
        "<|>": $less$bar$greater, 
        empty: empty, 
        liftA1: liftA1, 
        pure: pure, 
        "<*>": $less$times$greater, 
        "<$>": $less$dollar$greater, 
        show: show, 
        cons: cons, 
        ":": $colon, 
        "#": $hash, 
        "$": $dollar, 
        id: id, 
        ">>>": $greater$greater$greater, 
        "<<<": $less$less$less, 
        asTypeOf: asTypeOf, 
        "const": $$const, 
        flip: flip, 
        semigroupoidArr: semigroupoidArr, 
        categoryArr: categoryArr, 
        showUnit: showUnit, 
        showString: showString, 
        showBoolean: showBoolean, 
        showNumber: showNumber, 
        showArray: showArray, 
        numNumber: numNumber, 
        eqUnit: eqUnit, 
        eqString: eqString, 
        eqNumber: eqNumber, 
        eqBoolean: eqBoolean, 
        eqArray: eqArray, 
        eqOrdering: eqOrdering, 
        showOrdering: showOrdering, 
        ordUnit: ordUnit, 
        ordBoolean: ordBoolean, 
        ordNumber: ordNumber, 
        ordString: ordString, 
        ordArray: ordArray, 
        bitsNumber: bitsNumber, 
        boolLikeBoolean: boolLikeBoolean, 
        semigroupUnit: semigroupUnit, 
        semigroupString: semigroupString
    };
})();
var PS = PS || {};
PS.Prelude_Unsafe = (function () {
    "use strict";
    function unsafeIndex(xs) {  return function(n) {    return xs[n];  };};
    return {
        unsafeIndex: unsafeIndex
    };
})();
var PS = PS || {};
PS.Data_Maybe = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Nothing = {
        ctor: "Data.Maybe.Nothing", 
        values: [  ]
    };
    var Just = function (value0) {
        return {
            ctor: "Data.Maybe.Just", 
            values: [ value0 ]
        };
    };
    var showMaybe = function (__dict_Show_13) {
        return {
            "__superclasses": {}, 
            show: function (_1) {
                if (_1.ctor === "Data.Maybe.Just") {
                    return "Just (" + Prelude.show(__dict_Show_13)(_1.values[0]) + ")";
                };
                if (_1.ctor === "Data.Maybe.Nothing") {
                    return "Nothing";
                };
                throw "Failed pattern match";
            }
        };
    };
    var maybe = function (_1) {
        return function (_2) {
            return function (_3) {
                if (_3.ctor === "Data.Maybe.Nothing") {
                    return _1;
                };
                if (_3.ctor === "Data.Maybe.Just") {
                    return _2(_3.values[0]);
                };
                throw "Failed pattern match";
            };
        };
    };
    var isNothing = maybe(true)(Prelude["const"](false));
    var isJust = maybe(false)(Prelude["const"](true));
    var functorMaybe = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": function (_1) {
                return function (_2) {
                    if (_2.ctor === "Data.Maybe.Just") {
                        return Just(_1(_2.values[0]));
                    };
                    return Nothing;
                };
            }
        };
    };
    var fromMaybe = function (a) {
        return maybe(a)(Prelude.id(Prelude.categoryArr({})));
    };
    var eqMaybe = function (__dict_Eq_15) {
        return {
            "__superclasses": {}, 
            "==": function (_1) {
                return function (_2) {
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        if (_2.ctor === "Data.Maybe.Nothing") {
                            return true;
                        };
                    };
                    if (_1.ctor === "Data.Maybe.Just") {
                        if (_2.ctor === "Data.Maybe.Just") {
                            return Prelude["=="](__dict_Eq_15)(_1.values[0])(_2.values[0]);
                        };
                    };
                    return false;
                };
            }, 
            "/=": function (a) {
                return function (b) {
                    return !Prelude["=="](eqMaybe(__dict_Eq_15))(a)(b);
                };
            }
        };
    };
    var ordMaybe = function (__dict_Ord_14) {
        return {
            "__superclasses": {
                "Prelude.Eq_0": function (_) {
                    return eqMaybe(__dict_Ord_14["__superclasses"]["Prelude.Eq_0"]({}));
                }
            }, 
            compare: function (_1) {
                return function (_2) {
                    if (_1.ctor === "Data.Maybe.Just") {
                        if (_2.ctor === "Data.Maybe.Just") {
                            return Prelude.compare(__dict_Ord_14)(_1.values[0])(_2.values[0]);
                        };
                    };
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        if (_2.ctor === "Data.Maybe.Nothing") {
                            return Prelude.EQ;
                        };
                    };
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        return Prelude.LT;
                    };
                    if (_2.ctor === "Data.Maybe.Nothing") {
                        return Prelude.GT;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applyMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorMaybe({});
                }
            }, 
            "<*>": function (_1) {
                return function (_2) {
                    if (_1.ctor === "Data.Maybe.Just") {
                        return Prelude["<$>"](functorMaybe({}))(_1.values[0])(_2);
                    };
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var bindMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            ">>=": function (_1) {
                return function (_2) {
                    if (_1.ctor === "Data.Maybe.Just") {
                        return _2(_1.values[0]);
                    };
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        return Nothing;
                    };
                    throw "Failed pattern match";
                };
            }
        };
    };
    var applicativeMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyMaybe({});
                }
            }, 
            pure: Just
        };
    };
    var monadMaybe = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeMaybe({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindMaybe({});
                }
            }
        };
    };
    var alternativeMaybe = function (_) {
        return {
            "__superclasses": {}, 
            empty: Nothing, 
            "<|>": function (_1) {
                return function (_2) {
                    if (_1.ctor === "Data.Maybe.Nothing") {
                        return _2;
                    };
                    return _1;
                };
            }
        };
    };
    return {
        Nothing: Nothing, 
        Just: Just, 
        isNothing: isNothing, 
        isJust: isJust, 
        fromMaybe: fromMaybe, 
        maybe: maybe, 
        functorMaybe: functorMaybe, 
        applyMaybe: applyMaybe, 
        applicativeMaybe: applicativeMaybe, 
        alternativeMaybe: alternativeMaybe, 
        bindMaybe: bindMaybe, 
        monadMaybe: monadMaybe, 
        showMaybe: showMaybe, 
        eqMaybe: eqMaybe, 
        ordMaybe: ordMaybe
    };
})();
var PS = PS || {};
PS.Data_Maybe_Unsafe = (function () {
    "use strict";
    var fromJust = function (_1) {
        if (_1.ctor === "Data.Maybe.Just") {
            return _1.values[0];
        };
        throw "Failed pattern match";
    };
    return {
        fromJust: fromJust
    };
})();
var PS = PS || {};
PS.Data_Function = (function () {
    "use strict";
    var on = function (f) {
        return function (g) {
            return function (x) {
                return function (y) {
                    return f(g(x))(g(y));
                };
            };
        };
    };
    return {
        on: on
    };
})();
var PS = PS || {};
PS.Data_Eq = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    var Ref = function (value0) {
        return {
            ctor: "Data.Eq.Ref", 
            values: [ value0 ]
        };
    };
    var liftRef = function (_1) {
        return function (_2) {
            return function (_3) {
                return _1(_2.values[0])(_3.values[0]);
            };
        };
    };
    var eqRef = function (_) {
        return {
            "__superclasses": {}, 
            "==": liftRef(Prelude.refEq), 
            "/=": liftRef(Prelude.refIneq)
        };
    };
    return {
        Ref: Ref, 
        liftRef: liftRef, 
        eqRef: eqRef
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function returnE(a) {  return function() {    return a;  };};
    function bindE(a) {  return function(f) {    return function() {      return f(a())();    };  };};
    function runPure(f) {  return f();};
    function untilE(f) {  return function() {    while (!f()) { }    return {};  };};
    function whileE(f) {  return function(a) {    return function() {      while (f()) {        a();      }      return {};    };  };};
    function forE(lo) {  return function(hi) {    return function(f) {      return function() {        for (var i = lo; i < hi; i++) {          f(i)();        }      };    };  };};
    function foreachE(as) {  return function(f) {    for (var i = 0; i < as.length; i++) {      f(as[i])();    }  };};
    var applicativeEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            pure: returnE
        };
    };
    var applyEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Functor_0": function (_) {
                    return functorEff({});
                }
            }, 
            "<*>": Prelude.ap(monadEff({}))
        };
    };
    var functorEff = function (_) {
        return {
            "__superclasses": {}, 
            "<$>": Prelude.liftA1(applicativeEff({}))
        };
    };
    var monadEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Applicative_0": function (_) {
                    return applicativeEff({});
                }, 
                "Prelude.Bind_1": function (_) {
                    return bindEff({});
                }
            }
        };
    };
    var bindEff = function (_) {
        return {
            "__superclasses": {
                "Prelude.Apply_0": function (_) {
                    return applyEff({});
                }
            }, 
            ">>=": bindE
        };
    };
    return {
        foreachE: foreachE, 
        forE: forE, 
        whileE: whileE, 
        untilE: untilE, 
        runPure: runPure, 
        bindE: bindE, 
        returnE: returnE, 
        functorEff: functorEff, 
        applyEff: applyEff, 
        applicativeEff: applicativeEff, 
        bindEff: bindEff, 
        monadEff: monadEff
    };
})();
var PS = PS || {};
PS.Control_Monad_Eff_Unsafe = (function () {
    "use strict";
    function unsafeInterleaveEff(f) {  return f;};
    return {
        unsafeInterleaveEff: unsafeInterleaveEff
    };
})();
var PS = PS || {};
PS.Control_Monad_ST = (function () {
    "use strict";
    function newSTRef(val) {  return function () {    return { value: val };  };};
    function readSTRef(ref) {  return function() {    return ref.value;  };};
    function modifySTRef(ref) {  return function(f) {    return function() {      return ref.value = f(ref.value);    };  };};
    function writeSTRef(ref) {  return function(a) {    return function() {      return ref.value = a;    };  };};
    function newSTArray(len) {  return function(a) {    return function() {      var arr = [];      for (var i = 0; i < len; i++) {        arr[i] = a;      };      return arr;    };  };};
    function peekSTArray(arr) {  return function(i) {    return function() {      return arr[i];    };  };};
    function pokeSTArray(arr) {  return function(i) {    return function(a) {      return function() {        return arr[i] = a;      };    };  };};
    function runST(f) {  return f;};
    function runSTArray(f) {  return f;};
    return {
        runSTArray: runSTArray, 
        runST: runST, 
        pokeSTArray: pokeSTArray, 
        peekSTArray: peekSTArray, 
        newSTArray: newSTArray, 
        writeSTRef: writeSTRef, 
        modifySTRef: modifySTRef, 
        readSTRef: readSTRef, 
        newSTRef: newSTRef
    };
})();
var PS = PS || {};
PS.Debug_Trace = (function () {
    "use strict";
    var Prelude = PS.Prelude;
    function trace(s) {  return function() {    console.log(s);    return {};  };};
    var print = function (__dict_Show_16) {
        return function (o) {
            return trace(Prelude.show(__dict_Show_16)(o));
        };
    };
    return {
        print: print, 
        trace: trace
    };
})();
var PS = PS || {};
PS.Browser_WebStorage = (function () {
    "use strict";
    var localStorage = window.localStorage;
    var localLength = (function() {return window.localStorage.length;})();
    function localKey(ls) {  return function(num) {    return null2Maybe(ls.key(num));  }};
    function localGetItem(ls) {  return function(str) {    return null2Maybe(ls.getItem(str));  }};
    function localSetItem(ls) {  return function(str) {    return function(val) {      ls.setItem(str, val);      return ls;    }  }};
    function localRemoveItem(ls) {  return function(str) {    ls.removeItem(str);    return ls;  }};
    function localClear(ls) {  ls.clear();  return ls;};
    var sessionStorage = window.sessionStorage;
    function sessionLength(ss) {  return ss.length;};
    function sessionKey(ss) {  return function(num) {    return null2Maybe(ss.key(num));  }};
    function sessionGetItem(ss) {  return function(str) {    return null2Maybe(ss.getItem(str));  }};
    function sessionSetItem(ss) {  return function(str) {    return function(val) {      ss.setItem(str, val);      return ss;    }  }};
    function sessionRemoveItem(ss) {  return function(str) {    ss.removeItem(str);    return ss;  }};
    function sessionClear(ss) {  ss.clear();  return ss;};
    function null2Maybe(n) {  return n === null ? Data_Maybe.Nothing : Data_Maybe.Just(n);};
    var storageSessionStorage = function (_) {
        return {
            "__superclasses": {}, 
            length: sessionLength(sessionStorage), 
            key: sessionKey(sessionStorage), 
            getItem: sessionGetItem(sessionStorage), 
            setItem: sessionSetItem(sessionStorage), 
            removeItem: sessionRemoveItem(sessionStorage), 
            clear: sessionClear(sessionStorage)
        };
    };
    var storageLocalStorage = function (_) {
        return {
            "__superclasses": {}, 
            length: localLength(localStorage), 
            key: localKey(localStorage), 
            getItem: localGetItem(localStorage), 
            setItem: localSetItem(localStorage), 
            removeItem: localRemoveItem(localStorage), 
            clear: localClear(localStorage)
        };
    };
    var setItem = function (dict) {
        return dict.setItem;
    };
    var removeItem = function (dict) {
        return dict.removeItem;
    };
    var length = function (dict) {
        return dict.length;
    };
    var key = function (dict) {
        return dict.key;
    };
    var getItem = function (dict) {
        return dict.getItem;
    };
    var clear = function (dict) {
        return dict.clear;
    };
    return {
        null2Maybe: null2Maybe, 
        sessionClear: sessionClear, 
        sessionRemoveItem: sessionRemoveItem, 
        sessionSetItem: sessionSetItem, 
        sessionGetItem: sessionGetItem, 
        sessionKey: sessionKey, 
        sessionLength: sessionLength, 
        sessionStorage: sessionStorage, 
        localClear: localClear, 
        localRemoveItem: localRemoveItem, 
        localSetItem: localSetItem, 
        localGetItem: localGetItem, 
        localKey: localKey, 
        localLength: localLength, 
        localStorage: localStorage, 
        clear: clear, 
        removeItem: removeItem, 
        setItem: setItem, 
        getItem: getItem, 
        key: key, 
        length: length, 
        storageLocalStorage: storageLocalStorage, 
        storageSessionStorage: storageSessionStorage
    };
})();
