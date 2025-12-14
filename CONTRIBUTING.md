# Contributing to Beacon

Pull requests, bug reports, and all other forms of contribution are welcomed and highly encouraged. Thank you for helping improve Beacon!

## How to Get Started

- Fork this repository and create a feature branch from `main` (for example, `feature/my-change`).
- Install dependencies with `npm install`.
- Make your changes in small, focused commits. Use `git commit -s` to include a "Signed-off-by" line in your commit messages.
- Run the test suite locally with `npm test` before opening a pull request.

If you are unsure about an approach, feel free to open a draft pull request to get feedback early.

## Reporting Issues

You can report an issue here: https://github.com/Deloitte/beacon/issues 

When reporting an issue, please include enough detail for us to reliably reproduce and diagnose the problem. In particular:

- The **version of Beacon** you are using.
- Details about your **environment**, such as:
  - Operating system and version.
  - The version of the compiled `beacon.js` file or the development build.
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
- **Update documentation** (such as `README.md`, examples in `docs/`, etc.) when behavior or usage changes.
- Do not include any **secrets, credentials, or proprietary data** in code, tests, or documentation.
- Be aware that **all pull requests will be evaluated against internal Deloitte policies** before being accepted.

If you are planning a large or potentially breaking change, consider opening an issue first to discuss the proposal before investing significant effort.

### Signing Commits

This repository requires all commits to be signed. We use SSH key signing (available in Git 2.34+). To configure commit signing for this repository:

1. **Find your SSH public key**: Look for your SSH public key file (typically `~/.ssh/id_rsa.pub` or similar). If you don't have an SSH key, you can generate one with `ssh-keygen`.

2. **Configure Git for this repository** (local configuration only):
   ```bash
   git config --local commit.gpgsign true
   git config --local gpg.format ssh
   git config --local user.signingkey ~/.ssh/your-key-name.pub
   ```
   Replace `your-key-name.pub` with the actual name of your SSH public key file.

3. **Add your SSH key to GitHub** (required for GitHub to verify your signatures):
   - Copy your public key: `cat ~/.ssh/your-key-name.pub` (or open the `.pub` file)
   - Go to GitHub → Settings → SSH and GPG keys → New SSH key
   - Select "Signing Key" as the key type
   - Paste your public key and save
   
   Note: This is separate from SSH keys used for authentication. GitHub needs your signing key to verify commit signatures.

4. **Verify your configuration**:
   ```bash
   git config --local --get-regexp '^(commit\.gpgsign|gpg\.format|user\.signingkey)'
   ```

5. **Test it**: Make a commit and verify it's signed:
   ```bash
   git commit -s -m "Test commit"
   git log --show-signature -1
   ```

Your commits will now be automatically signed with your SSH key for this repository only. Once you've added your SSH key to GitHub as a signing key, GitHub will verify and display your signatures on commits and pull requests.

**Note**: Always use `git commit -s` (or `git commit --signoff`) when making commits. The `-s` flag adds a "Signed-off-by" line to your commit message, which certifies that you have the right to submit the work under the project's license.

## Pull Request Guidelines

Before opening a pull request, please:

- Ensure that `npm test` passes and that any new tests are stable and meaningful.
- Provide a clear description of what the pull request does and why the change is needed.
- Reference any related issues (for example, `Closes #123`) when appropriate.
- Call out any **breaking changes** or migration steps required for existing users.

Once submitted, maintainers may request changes or clarifications. Collaborating on this feedback is a normal part of the review process and helps keep Beacon stable and reliable.
