<h1 align="center">
<br>
<img width="300px;" src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/12249a6024b6305759a62bfa1ce5c5b466f7d536/github/logo.png">
<br>
<a href="https://travis-ci.org/CodeDotJS/repocreate"><img src="https://travis-ci.org/CodeDotJS/repocreate.svg?branch=master"></a>

<img width="50px;" src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/12249a6024b6305759a62bfa1ce5c5b466f7d536/github/gitlogo.png">

<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg">
<br>
<p align="center">An over-engineered but ultra-fast tool to create Github repositories from command-line!</p>
</h1>

### Install

```
$ npm install --global repocreate
```
__`OR`__
```
$ sudo npm install --global repocreate
````

### Preview

<p align="center">
<img src="https://raw.githubusercontent.com/rishigiridotcom/rishigiri.com/4a60698eac5734ef8c62fba3540c1b985a76b0a3/github/repocreate.gif">
</p>

### Usage

```
 Usage: repocreate <command> [option]

 Commands:
  -c, --create         name of the repository
  -d, --description    description of the repository

 NOTE : --description is optional

 Example:
  $ repocreate -c foobar
  $ repocreate -c "foo bar" -d Just another foobarism

 Help:
  -h, --help           Display help
```

__`NOTE`__

- If the name of your repository is of more than one word, pass the argument as a single string inside single or double quotes.
- You don't have to put the descriptions inside quotes. Things will work fine even if you do that!

### Setup

- Generate your `access token` from [`here`](https://github.com/settings/tokens) and copy it.
- Run command `$ repocreate -c testrepo`
- A `token.json` file will open in Sublime with -
	```json
	{
	  "username": "enter your github username",
	  "token":"paste the access token"
	}
	```
- Enter your `username`, paste the `token` and save the file. You are ready to go!

__`NOTE`__

__`In case, you are not using sublime, follow the given steps -`__

- Manually open the `token.json` file saved under `.repocreate` folder under `home directory`

__`or`__

- Open the file using : `$ atom/code/vi ~/.repocreate/token.json`
- Copy-paste the genereated `access token`
- Save the file and that's it.

#### __`Why?`__

- I don't know, it's silly, but I use it. I don't know.

### License

MIT &copy; [Rishi Giri](https://rishigiri.ml)
