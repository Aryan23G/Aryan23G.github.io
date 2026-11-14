# Lesson 1 — Calculator: logic, loops, and breaking a problem into stages

**Run:** `python calc.py`  **Test:** `python -m pytest`

## What you built

A calculator that reads lines like `x = 5` and `sqrt(x^2 + 1) * 2`, keeps variables between lines, and never crashes on bad input.

The shortcut is `eval(input())`. It's one line, and it's a security hole: `eval` runs *any* Python, so typing `__import__('os').system('rm -rf ~')` would delete your files. **Never `eval` text a user typed.** We wrote a real interpreter instead, and that's where most of the learning is.

## Fundamental 1: split a hard problem into stages

The program is three small functions in a row. Each has one job:

```
"2 + 3*4"  --tokenize-->  [2] [+] [3] [*] [4]  --parse-->  +        --evaluate-->  14
                                                          / \
                                                         2   *
                                                            / \
                                                           3   4
```

- **tokenize** only cares about characters. It knows nothing about precedence.
- **parse** only cares about structure. It never does arithmetic.
- **evaluate** only walks the tree. It never looks at characters.

Each stage can be understood and tested on its own, and when something breaks the error points to one stage. This is **separation of concerns**, the idea behind almost every design you'll meet: compilers, web apps (routes / logic / database), and ML pipelines (load / clean / train / evaluate).

## Fundamental 2: loops are state machines

`tokenize` is a `while` loop with an index `i`. Each pass looks at one character and decides: skip it, collect a number, collect a name, or emit an operator. The inner `while` loops eat characters until a number or name ends.

Why `while` and not `for ch in text`? Because a token can be several characters long, so we need to move `i` forward by different amounts. **Pick the loop that matches how far each step moves.**

The REPL in `main()` is the other kind of loop: `while True` with explicit exits (`break` on `quit` or Ctrl-D). Most servers, games, and shells are loops like this one.

## Fundamental 3: precedence comes from the structure

How does `2 + 3 * 4` become 14 and not 20? The grammar has one rule per precedence level:

```
expr  := term  (("+"|"-") term)*      <- lowest precedence
term  := unary (("*"|"/") unary)*
power := atom ("^" unary)?            <- highest precedence
```

`expr` calls `term`, so a whole `3 * 4` is grabbed before `+` gets to see it. This is called **recursive descent**: each grammar rule becomes one method, and the methods call each other. The rules also set *associativity*:

- `10 - 4 - 3` loops left to right, so you get `(10-4)-3 = 3`.
- `2 ^ 3 ^ 2` recurses to the right, so you get `2^(3^2) = 512`, as in math.

The tests check both. Getting associativity wrong is a classic bug.

## Fundamental 4: two kinds of errors

| Kind | Example | What to do |
|---|---|---|
| **User error** (expected) | `1 / 0`, `(1 + 2`, `y + 1` | Raise `CalcError` with a clear message. The REPL prints it and keeps going. |
| **Programmer error** (a bug) | A typo in our code, an `AttributeError` | Let it crash loudly so you see it and fix it. |

That's why `main()` catches only `CalcError`, never a bare `except:`. A bare `except` would hide your own bugs behind "error: something went wrong". **Catch exactly what you expect, and let everything else surface.**

Notice also that `evaluate` turns Python's `ValueError` (from `sqrt(-1)`) and `OverflowError` into `CalcError`. That's **translating errors at a boundary**: whoever calls the calculator only has to handle one exception type.

## Fundamental 5: tests are a list of things you promise

`test_calc.py` uses `@pytest.mark.parametrize` to run one test function over many inputs. The test cases are a written list of the rules: precedence, associativity, every error case. If you change the parser later and break `10 - 4 - 3`, pytest tells you within a second.

Write a test for every bug you fix. Then the bug can't come back without you noticing.

## Smaller lessons worth keeping

- **`@dataclass(frozen=True)`** gives you small immutable records (`Num`, `BinOp`) in one line. Immutable data is easier to reason about.
- **`match` / `case`** (Python 3.10+) is a clean way to branch on the *shape* of data. It's a natural fit for walking a tree.
- **Floating point:** `0.1 + 0.2` is `0.30000000000000004` because computers store numbers in binary. `format_number` hides that for display, and the tests compare with `pytest.approx`. Never compare floats with `==` in real code.
- **`if __name__ == "__main__":`** lets the file be both a script you run and a module the tests can import without starting the REPL.

## Exercises (do them; that's where it sticks)

1. Add `max(a, b)` with two arguments. You'll need to change the grammar so `atom` accepts comma-separated arguments.
2. Add implicit multiplication so `2x` and `3(4+1)` work. Where should that go: tokenizer, parser, or evaluator? (The parser.)
3. Add a `vars` command that prints every variable. Should it live in `Calculator.run` or in `main`? (In `main`, because it's about I/O.)
4. Write a failing test first for one new feature, then make it pass. That habit is called test-driven development (TDD).
