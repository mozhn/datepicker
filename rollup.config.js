export default {
	entry: 'dist/index.js',
	dest: 'dist/bundles/npm-module-datepicker.umd.js',
	sourceMap: false,
	format: 'umd',
	moduleName: 'ng.npm-module-datepicker',
	globals: {
		'@angular/core': 'ng.core',
		'@angular/common': 'ng.common',
		'rxjs/Observable': 'Rx',
		'rxjs/ReplaySubject': 'Rx',
		'rxjs/add/operator/map': 'Rx.Observable.prototype',
		'rxjs/add/operator/mergeMap': 'Rx.Observable.prototype',
		'rxjs/add/observable/fromEvent': 'Rx.Observable',
		'rxjs/add/observable/of': 'Rx.Observable'
	}
}
