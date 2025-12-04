# Contributing to Beacon

Pull requests, bug reports, and all other forms of contribution are welcomed and highly encouraged. Thank you for helping improve Beacon!

## How to Get Started

- Fork this repository and create a feature branch from `main` (for example, `feature/my-change`).
- Install dependencies with `npm install`.
- Make your changes in small, focused commits.
- Run the test suite locally with `npm test` before opening a pull request.

If you are unsure about an approach, feel free to open a draft pull request to get feedback early.

## Reporting Issues

When reporting an issue, please include enough detail for us to reliably reproduce and diagnose the problem. In particular:

- The **version of Beacon** you are using.
- Details about your **environment**, such as:
  - Operating system and version.
  - Whether you are using a compiled version from the `compiled/` folder, the development build, or the compiled JavaScript file from `dist/`.
  - Any relevant browser or runtime details (for example, browser and version, Node.js version).
- A clear description of the behavior you are seeing, including:
  - Steps to reproduce the issue.
  - What you expected to happen.
  - What actually happened (including any error messages or console output, if applicable).

Providing this information up front helps us triage and address issues much more quickly.

## Making Changes

When contributing code changes, please keep the following in mind:

- Be sure to **write tests** covering any new or changed functionality (`npm test` should pass before you open a pull request).
- Try to **keep changes focused and small**; smaller pull requests are easier to review and merge.
- **Follow existing patterns and style** in the codebase rather than introducing new patterns without discussion.
- **Update documentation** (such as `README.md`, examples in `sandbox/`, or other docs) when behavior or usage changes.
- Do not include any **secrets, credentials, or proprietary data** in code, tests, or documentation.
- Be aware that **all pull requests will be evaluated against internal Deloitte policies** before being accepted.

If you are planning a large or potentially breaking change, consider opening an issue first to discuss the proposal before investing significant effort.

## Pull Request Guidelines

Before opening a pull request, please:

- Ensure that `npm test` passes and that any new tests are stable and meaningful.
- Provide a clear description of what the pull request does and why the change is needed.
- Reference any related issues (for example, `Closes #123`) when appropriate.
- Call out any **breaking changes** or migration steps required for existing users.

Once submitted, maintainers may request changes or clarifications. Collaborating on this feedback is a normal part of the review process and helps keep Beacon stable and reliable.
