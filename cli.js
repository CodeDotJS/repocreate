#!/usr/bin/env node

'use strict';

const fs = require('fs');
const os = require('os');
const dns = require('dns');
const fse = require('fs-extra');
const jsonFile = require('jsonfile');
const execa = require('execa');
const logUpdate = require('log-update');
const ora = require('ora');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({pkg}).notify();

const spinner = ora();
const end = process.exit;

const msg = () => {
	logUpdate(`\n Please provide repository's name \n`);
	end(1);
};

const arg = process.argv[2];
const cmd = ['-c', '--create'];

if (!arg || arg === '-h' || arg === '--help' || cmd.indexOf(arg) === -1) {
	console.log(`
 Usage: repocreate <command> [reponame]

 Commands:
  -c, --create         name of the repository
  -d, --description    description of the repository

 NOTE : --description is optional

 Example:
  $ repo -c "jon doe"
  $ repo -c "foo bar" -d "Just another foobarism"

 Help:
  -h, --help           Display help
 `);
	end(1);
}
const repo = process.argv[3] === undefined ? msg() : process.argv[3].split(' ').join('-');

const ini = `${os.homedir()}/.repocreate/`;
const key = `${ini}token.json`;

const data = {
	username: 'Enter your github username',
	token: 'Paste your access token'
};

const description = process.argv.slice(5).join(' ') || '';

const returnCurl = (user, key) => {
	return `curl -u "${user}:${key}" https://api.github.com/user/repos -d '{"name":"'${repo}'", "description":"'"${description}"'"}'`;
};

dns.lookup('github.com', err => {
	if (err) {
		logUpdate(`\n Please check your Internet Connection! \n`);
		end(1);
	}
});

if ((arg === '-c' || arg === '--create') && !fs.existsSync(key)) {
	console.log(`\n Fill the required fields to use this tool!`);

	fse.ensureFile(key, err => {
		logUpdate(err);

		execa.shell(`subl ${key}`);

		jsonFile.writeFile(key, data, {spaces: 2}, err => {
			logUpdate(err);
		});
	});
} else {
	jsonFile.readFile(key, (err, keys) => {
		logUpdate(err);

		spinner.text = 'Creating...';
		spinner.start();

		const username = keys.username;
		const token = keys.token;
		const url = returnCurl(username, token);

		execa.shell(url).then(res => {
			const sshUrl = res.stdout;

			fs.writeFile(`${ini}logfile.json`, sshUrl, err => {
				if (err) {
					logUpdate(err);
				}

				jsonFile.readFile(`${ini}logfile.json`, (err, urls) => {
					logUpdate(err);

					const sshBase = urls.ssh_url;
					logUpdate(`\n Successfully created the repository! \n\n SSH url : ${sshBase} \n`);
					let message = '';

					if (sshBase === undefined) {
						if (urls.message === 'Repository creation failed.') {
							message = '\n Repository already exists! \n';
							logUpdate(message);
						} else {
							logUpdate(`\n ${urls.message} \n`);
						}
					}
				});
			});
			spinner.stop();
		}).catch(err => {
			if (err) {
				logUpdate(err);
			}
		});
	});
}
