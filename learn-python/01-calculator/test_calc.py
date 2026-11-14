import math

import pytest

from calc import CalcError, Calculator, format_number


@pytest.fixture
def calc():
    return Calculator()


@pytest.mark.parametrize("expr, expected", [
    ("1 + 2", 3),
    ("2 + 3 * 4", 14),            # precedence: * before +
    ("(2 + 3) * 4", 20),          # parentheses override it
    ("10 - 4 - 3", 3),            # left-associative: (10-4)-3, not 10-(4-3)
    ("2 ^ 3 ^ 2", 512),           # right-associative: 2^(3^2)
    ("-2 ^ 2", -4),               # like math notation: -(2^2)
    ("--3", 3),
    ("7 % 3", 1),
    ("1.5 * 2", 3),
    ("sqrt(16) + abs(-2)", 6),
    ("2 * pi", 2 * math.pi),
])
def test_expressions(calc, expr, expected):
    assert calc.run(expr) == pytest.approx(expected)


def test_variables_and_ans(calc):
    calc.run("x = 5")
    assert calc.run("x * 2") == 10
    assert calc.run("ans + 1") == 11


@pytest.mark.parametrize("bad", [
    "", "1 +", "(1 + 2", "1 + 2)", "1 / 0", "2 $ 3", "1..2",
    "y + 1", "foo(2)", "sqrt(-1)", "pi = 3", "(-8) ^ 0.5", "10 ^ 1000",
])
def test_errors_are_calc_errors(calc, bad):
    with pytest.raises(CalcError):
        calc.run(bad)


def test_format_number():
    assert format_number(4.0) == "4"
    assert format_number(0.1 + 0.2) == "0.3"
