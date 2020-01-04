# vscode-hakyll

Simple Hakyll support for VSCode

## Features

Press ```command + shift + P``` to:

1. `Create new Hakyll Post`
2. `Generate Site`
3. `Deploy Hakyll` *(see [Note](#note))*
4. `Start Preview Server`

## Note

In order to deploy the generated site to GitHub pages (whatever...):

1. Create a folder called `_public` in the **root** path: `mkdir _public`
2. Initialize git there: `cd _public && git init`
3. Add remote url for your target repo and make an initial commit.

## Requirements

Should be initialized with `Stack`.
