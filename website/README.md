# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Note that the API reference is automatically generated using TypeDoc. In order to update this part of the site, please run ` yarn api-doc`.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

Do not forget to regenerate the API reference if necessary.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

> If you experience issues with commit signing, you may have to temporarily choose another global GIT user email i.e.
> run `git config --global user.email $ANOTHER_ADDRESS`.

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
