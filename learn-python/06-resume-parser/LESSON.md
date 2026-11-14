# Lesson 6 — Resume Parser: NLP pipelines and measuring accuracy

**Run:** `python resume_parser.py samples/priya.txt --pretty`  **Measure:** `python evaluate.py`  **Test:** `python -m pytest`
For PDFs: `pip install pypdf`. For Word files: `pip install python-docx`.

## What you built

A tool that reads a resume and outputs JSON: name, email, phone, links, skills, degrees, GPA, jobs with dates, and total years of experience. Applicant tracking systems (ATS) do this to every resume you'll ever send, so building one also shows you how to write a resume machines can read.

## Fundamental 1: NLP is a pipeline

```
extract_text  ->  normalize  ->  split_sections  ->  extract fields  ->  JSON
(pdf/docx/txt)   (clean text)    (header? skills?)   (regex, lists)
```

This is the same staged design as the calculator in Lesson 1 (tokenize, parse, evaluate), applied to messy human text. Each stage makes the next one easier:

- **normalize** turns the ligature `ﬁ` into `fi`, em-dashes into `-`, and squashes extra spaces. Text pulled from PDFs is full of this, and every later regex would otherwise need to handle it.
- **split_sections** lets later stages *search only where it makes sense*. Dates in "Experience" are jobs; dates in "Education" are not.

## Fundamental 2: context fixes ambiguity

Is "C" a programming language? In "Skills: Python, C, SQL", yes. In "Grade C in first aid", no. In "C#", it's a different language. That's the core problem of NLP: **the same word means different things in different places.**

The parser handles it in two ways:

1. **Short or ambiguous words (`C`, `Go`, `ML`, `node`) only count inside the Skills section.** `sam.txt` has "Grade C" and "Go-to person" as deliberate traps, and neither is picked up.
2. **Careful word boundaries.** `\b` in regex doesn't work next to symbols (`c++`), so `_alias_pattern` uses look-arounds: "not preceded by a letter, `+`, `#` or `.`, not followed by a letter, `+` or `#`". That's how `C++` matches but `C#` doesn't count as `C`.

A test caught a real gap here: "Go" was only listed under the spelling "golang", so a resume that says "Go" was missed. One line fixed it. Rule-based systems are built exactly like this: find a miss, add a rule, check you didn't break anything.

## Fundamental 3: you can't improve what you don't measure

**`evaluate.py` is the most important file in this project.** `samples/labels.json` holds the *correct* answers, written by hand. The script compares the parser's output against them and reports:

- **Precision**: of the skills we reported, what fraction were actually there? (Low precision means false alarms.)
- **Recall**: of the skills actually there, what fraction did we find? (Low recall means misses.)
- **F1**: a single score that balances the two.

These two pull against each other. Match every two-letter word and recall goes up while precision falls. Only match exact full names and precision rises while recall falls. Which matters more depends on the use: a recruiter's search wants high recall, and an automatic rejection filter needs high precision.

The workflow is: **change a rule, run `evaluate.py`, check whether the numbers went up.** That's how ML engineers work too, only with bigger datasets. Two labeled resumes is a toy. A real evaluation set would have 100+, including ugly ones (two-column PDFs, tables, Hindi or Spanish headings).

Notice `TODAY = date(2026, 11, 14)` in the evaluation and tests. "Present" means a different date every day, so the tests pin the date to give the same result every run. **Tests that depend on the clock are flaky tests.**

## Fundamental 4: a real algorithm, interval merging

Someone was a TA from Jan to Aug 2024 *and* an intern from Jun to Dec 2024. Adding the months (8 + 7 = 15) overstates their experience, because they only worked 12 calendar months. `total_experience_years` sorts the date ranges and merges any that overlap:

```
[Jan24-Aug24] [Jun24-Dec24] [Mar25-Now]   ->   [Jan24-Dec24] [Mar25-Now]
```

This is a common interview question ("merge intervals"), and here it shows up for a real reason. Dates are first turned into a single month number (`year*12 + month`), so comparing and subtracting them is plain arithmetic. **Pick a data representation that makes the operations you need easy.**

## Fundamental 5: rules or machine learning?

We used rules (regex plus word lists), not a trained model. When does each make sense?

| | Rules | ML model (e.g. spaCy NER, an LLM) |
|---|---|---|
| Needs labeled data | no | yes, a lot (or a large pretrained model) |
| Explainable | yes: you can point to the exact rule | harder |
| Handles new phrasing | badly | well |
| Cost and speed | free and instant | slower; LLMs cost money per call |

A sensible path is to **start with rules plus an evaluation set**, then try a model when the rules stop improving, and *use the same evaluation set to prove the model is better*. Without `evaluate.py` you couldn't tell whether switching was worth it.

## Smaller lessons worth keeping

- **Optional dependencies:** `pypdf` is imported inside `extract_text`, so `.txt` files work without installing it.
- **Defaults hide assumptions.** A year with no month ("2019 to 2020") is read as Jan 2019 to Dec 2020. That's a choice, and it should be written down (it is, in a comment) and tested (`test_year_only_ranges_cover_whole_years`).
- **Reject impossible data** (an end date before the start date) instead of producing negative months.
- **Private fields:** `Job._range` is used for calculations but removed from the JSON in `to_dict`, so callers can't come to depend on it.

## Exercises

1. Add a third, messier resume to `samples/` with its labels, and fix whatever it breaks. Run `evaluate.py` before and after.
2. Add `pip install spacy` and `python -m spacy download en_core_web_sm`. Use the `PERSON` entity as a fallback when `extract_name` returns `None`. Did evaluation improve?
3. Add a "job match" score: given a job description, what percentage of its skills appear in the resume? Which skills are missing?
4. Run your own resume through it. If it gets something wrong, an ATS might too. Fix the resume or the parser.
