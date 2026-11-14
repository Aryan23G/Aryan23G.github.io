"""A command-line calculator that understands real expressions like  2 + 3 * (4 - 1) ^ 2.

It does NOT use eval(). Instead it works in three stages, the same way real
compilers and interpreters do:

    text  --tokenize-->  tokens  --parse-->  tree  --evaluate-->  number

Run it:   python calc.py
Test it:  python -m pytest
"""

from __future__ import annotations

import math
from dataclasses import dataclass


class CalcError(Exception):
    """Any problem with the user's expression. The REPL catches only this."""


# ---------------------------------------------------------------- 1. tokenize

@dataclass(frozen=True)
class Token:
    kind: str    # "num", "op", "(", ")", "name"
    value: str


OPERATORS = set("+-*/^%")


def tokenize(text: str) -> list[Token]:
    """Turn '12 + x*3' into [num 12, op +, name x, op *, num 3]."""
    tokens: list[Token] = []
    i = 0
    while i < len(text):
        ch = text[i]
        if ch.isspace():
            i += 1
        elif ch.isdigit() or ch == ".":
            start = i
            while i < len(text) and (text[i].isdigit() or text[i] == "."):
                i += 1
            number = text[start:i]
            if number.count(".") > 1 or number == ".":
                raise CalcError(f"bad number {number!r}")
            tokens.append(Token("num", number))
        elif ch.isalpha() or ch == "_":
            start = i
            while i < len(text) and (text[i].isalnum() or text[i] == "_"):
                i += 1
            tokens.append(Token("name", text[start:i]))
        elif ch in OPERATORS:
            tokens.append(Token("op", ch))
            i += 1
        elif ch in "()":
            tokens.append(Token(ch, ch))
            i += 1
        elif ch == "=":
            tokens.append(Token("=", ch))
            i += 1
        else:
            raise CalcError(f"unexpected character {ch!r} at position {i}")
    return tokens


# ------------------------------------------------------------------ 2. parse
#
# Grammar (lowest precedence first). Each rule becomes one method below.
#
#   expr   := term (("+" | "-") term)*
#   term   := unary (("*" | "/" | "%") unary)*
#   unary  := "-" unary | power
#   power  := atom ("^" unary)?          # right-associative: 2^3^2 = 2^9
#   atom   := num | name | name "(" expr ")" | "(" expr ")"

@dataclass(frozen=True)
class Num:
    value: float

@dataclass(frozen=True)
class Var:
    name: str

@dataclass(frozen=True)
class BinOp:
    op: str
    left: "Node"
    right: "Node"

@dataclass(frozen=True)
class Neg:
    operand: "Node"

@dataclass(frozen=True)
class Call:
    func: str
    arg: "Node"

Node = Num | Var | BinOp | Neg | Call


class Parser:
    def __init__(self, tokens: list[Token]):
        self.tokens = tokens
        self.pos = 0

    def peek(self) -> Token | None:
        return self.tokens[self.pos] if self.pos < len(self.tokens) else None

    def advance(self) -> Token:
        tok = self.peek()
        if tok is None:
            raise CalcError("expression ended too early")
        self.pos += 1
        return tok

    def expect(self, kind: str) -> Token:
        tok = self.advance()
        if tok.kind != kind:
            raise CalcError(f"expected {kind!r} but found {tok.value!r}")
        return tok

    def parse(self) -> Node:
        if not self.tokens:
            raise CalcError("empty expression")
        node = self.expr()
        if self.peek() is not None:
            raise CalcError(f"unexpected {self.peek().value!r}")
        return node

    def expr(self) -> Node:
        node = self.term()
        while (tok := self.peek()) and tok.kind == "op" and tok.value in "+-":
            self.advance()
            node = BinOp(tok.value, node, self.term())
        return node

    def term(self) -> Node:
        node = self.unary()
        while (tok := self.peek()) and tok.kind == "op" and tok.value in "*/%":
            self.advance()
            node = BinOp(tok.value, node, self.unary())
        return node

    def unary(self) -> Node:
        tok = self.peek()
        if tok and tok.kind == "op" and tok.value == "-":
            self.advance()
            return Neg(self.unary())
        if tok and tok.kind == "op" and tok.value == "+":
            self.advance()
            return self.unary()
        return self.power()

    def power(self) -> Node:
        base = self.atom()
        tok = self.peek()
        if tok and tok.kind == "op" and tok.value == "^":
            self.advance()
            return BinOp("^", base, self.unary())
        return base

    def atom(self) -> Node:
        tok = self.advance()
        if tok.kind == "num":
            return Num(float(tok.value))
        if tok.kind == "name":
            nxt = self.peek()
            if nxt and nxt.kind == "(":
                self.advance()
                arg = self.expr()
                self.expect(")")
                return Call(tok.value, arg)
            return Var(tok.value)
        if tok.kind == "(":
            node = self.expr()
            self.expect(")")
            return node
        raise CalcError(f"unexpected {tok.value!r}")


# --------------------------------------------------------------- 3. evaluate

FUNCTIONS = {
    "sqrt": math.sqrt, "abs": abs, "sin": math.sin, "cos": math.cos,
    "tan": math.tan, "log": math.log10, "ln": math.log,
}
CONSTANTS = {"pi": math.pi, "e": math.e}


def evaluate(node: Node, variables: dict[str, float]) -> float:
    match node:
        case Num(value):
            return value
        case Var(name):
            if name in variables:
                return variables[name]
            if name in CONSTANTS:
                return CONSTANTS[name]
            raise CalcError(f"unknown variable {name!r}")
        case Neg(operand):
            return -evaluate(operand, variables)
        case Call(func, arg):
            if func not in FUNCTIONS:
                raise CalcError(f"unknown function {func!r}")
            try:
                return FUNCTIONS[func](evaluate(arg, variables))
            except ValueError:
                raise CalcError(f"{func}() got a value outside its domain")
        case BinOp(op, left, right):
            a, b = evaluate(left, variables), evaluate(right, variables)
            if op == "+": return a + b
            if op == "-": return a - b
            if op == "*": return a * b
            if op in "/%" and b == 0:
                raise CalcError("division by zero")
            if op == "/": return a / b
            if op == "%": return a % b
            if op == "^":
                try:
                    result = a ** b
                except OverflowError:
                    raise CalcError("result too large")
                if isinstance(result, complex):
                    raise CalcError("result is not a real number")
                return result
    raise CalcError(f"cannot evaluate {node!r}")  # unreachable if parser is right


# ------------------------------------------------------------- public API

class Calculator:
    """Holds variables between lines, so  x = 5  then  x * 2  works."""

    def __init__(self):
        self.variables: dict[str, float] = {}

    def run(self, line: str) -> float:
        tokens = tokenize(line)
        # Assignment:  name = expression
        if len(tokens) >= 2 and tokens[0].kind == "name" and tokens[1].kind == "=":
            name = tokens[0].value
            if name in CONSTANTS or name in FUNCTIONS:
                raise CalcError(f"{name!r} is reserved")
            value = evaluate(Parser(tokens[2:]).parse(), self.variables)
            self.variables[name] = value
        else:
            value = evaluate(Parser(tokens).parse(), self.variables)
        self.variables["ans"] = value
        return value


def format_number(x: float) -> str:
    if x == int(x) and abs(x) < 1e15:
        return str(int(x))
    return f"{x:.10g}"


def main() -> None:
    calc = Calculator()
    print("Calculator. Try: 2 + 3 * 4,  x = 5,  sqrt(x^2 + 1),  ans / 2.  Type 'quit' to exit.")
    while True:                                   # the REPL: Read, Eval, Print, Loop
        try:
            line = input("> ").strip()
        except (EOFError, KeyboardInterrupt):
            print()
            break
        if line in {"quit", "exit"}:
            break
        if not line:
            continue
        try:
            print(format_number(calc.run(line)))
        except CalcError as err:                  # user mistakes: explain and keep going
            print(f"error: {err}")


if __name__ == "__main__":
    main()
