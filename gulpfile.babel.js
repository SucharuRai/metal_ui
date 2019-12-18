import gulp from 'gulp';
import cp from 'child_process';
import BrowserSync from 'browser-sync';

const browserSync = BrowserSync.create();
const webpackOptions = ['--colors', '--display-error-details'];
const hugoOptions = ['-v --source site/'];

gulp.task(
	'build',
	gulp.parallel(
		() => runWebpack(['--mode', 'production', '--profile']),
		() => runHugo()
	)
);

gulp.task('watch', () => {
	runWebpack(['--mode', 'development', '--watch']);
	runHugo(['--buildDrafts', '--buildFuture', '--watch']);

	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
	gulp.watch('./public/**/*').on('change', browserSync.reload);
});

function runHugo(options) {
	return cp.spawn('hugo', hugoOptions.concat(options || []), {
		stdio: 'inherit'
	});
}

function runWebpack(options) {
	return cp.spawn('npm', ['webpack'].concat(webpackOptions, options || []), {
		stdio: 'inherit'
	});
}
