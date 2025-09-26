This is the repository for building and maintaining the webpage for the Finnish Quantum-Computing Infrastructure (FiQCI). You can view the main site at https://fiqci.fi.

## Contents
- [Site rewrite](#site-rewrite)
  - [Running Locally](#running-locally)
    - [Tools](#tools)
      - [Install `asdf` for runtime version management](#install-asdf-for-runtime-version-management)
        - [Install Ruby and Node.js using `asdf`](#install-ruby-and-nodejs-using-asdf)
        - [Install the Ruby gems and Node packages](#install-the-ruby-gems-and-node-packages)
    - [Serve with live reload](#serve-with-live-reload)
    - [Github Pages](#github-pages)
  - [Adding and editing content](#adding-and-editing-content)


# Site rewrite

The site was recently overhauled. Here you can find documentation on how to add content to the new site and how it works. Old version is available on https://github.com/FiQCI/fiqci.github.io/tree/old-fiqci.


## Running Locally

### Using Docker

A [`Dockerfile`](./Dockerfile) and [`docker-compose.yml`](./docker-compose.yml) are provided to build and view the website locally using a containerised environment. To build the docker container use 

```sh
docker compose build 
```

And then run the container with:

```sh
docker compose up
```

The site is viewable at [`http://localhost:4000/`](http://localhost:4000/). 


### Tools

- (`asdf` for runtime version management)
  - Ruby
    - (Bundler for managing Ruby gems)
    - Jekyll
  - Node.js
    - React
    - Tailwind CSS
    - Webpack

Some installation instructions follow. All of the commands shown are to be executed in the repository root.


#### Install `asdf` for runtime version management

Instructions at [Getting Started | asdf](https://asdf-vm.com/guide/getting-started.html).


##### Install Ruby and Node.js using `asdf`

The file `.tool-versions` contains the version numbers for
  - Ruby: 3.3.5
  - Node.js: v22.10.0
  
Install the `asdf` plugins (see the respective Git repositories for required dependencies) with

```bash
asdf plugin add ruby https://github.com/asdf-vm/asdf-ruby.git
```

and

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
```

Then, as instructed in `asdf --help`,

> ```text
> asdf install                            Install all the package versions listed
>                                         in the .tool-versions file
> ```

the command `asdf install` should install both Ruby and Node.js. It might take a while, though. When the installations are done, check the versions with

```console
$ ruby --version
ruby 3.3.5 (2024-09-03 revision ef084cc8f4) [x86_64-linux]
```

and

```console
$ node --version
v22.10.0
```


##### Install the Ruby gems and Node packages

If not already installed, install Bundler with

```bash
gem install bundler
```

Then, using Bundler, install the Ruby gems defined in the Gemfile

```bash
bundle install
```

Again, you can check the version (of Jekyll this time) with

```console
$ jekyll --version 
jekyll 4.3.4
```

Finally, install the Node packages with the command

```bash
npm install
```


### Serve with live reload

The command `npm run watch` starts Tailwind CSS, Webpack and Jekyll concurrently with the source monitored for changes.

The site should now be ready at `http://localhost:4000`.

### Github Pages
Pushed changes can also be previewed at either http://dev.fiqci.fi/ for the dev site or http://fiqci.fi/ for the main site.

## Adding and editing content

For adding a blog post see: [Adding a blog](docs/blog_post.md)


For adding an event see: [Adding an event](docs/event.md)

For editing the general contents of the site see: [Editing content](docs/edit_or_add_content.md)