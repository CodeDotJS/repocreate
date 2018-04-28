import childProcess from 'child_process';
import test from 'ava';

test.cb('createRepo', t => {
	const cp = childProcess.spawn('./cli.js', ['-c', 'image of', '-d', 'Download facebook users profile picture from command line!'], {stdio: 'inherit'});

	cp.on('error', t.ifError);

	cp.on('close', code => {
		t.is(code, 0);
		t.end();
	});
});
