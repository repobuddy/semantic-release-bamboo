export default {
	preset: 'ts-jest/presets/default-esm',
	// `@semantic-release/error` and `env-ci` are ESM-only, so the suite has to run as real
	// ESM. Without this (plus NODE_OPTIONS=--experimental-vm-modules on the scripts) jest
	// loads them as CJS and dies on `Unexpected token 'export'`.
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		// `module: esnext` is required here: the build tsconfig emits CJS for this
		// (non-"type":"module") package, and ts-jest would otherwise hand jest's ESM
		// runtime a CJS module — which fails with `exports is not defined`.
		'^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: { module: 'esnext' } }]
	},
	moduleNameMapper: {
		'^(\\.{1,2}/.*)\\.js$': '$1'
	},
	collectCoverageFrom: ['<rootDir>/ts/**/*.[jt]s'],
	roots: ['<rootDir>/ts'],
	testMatch: ['**/?(*.)+(spec|test|integrate|accept|system|unit).[jt]s?(x)'],
	watchPlugins: [
		'jest-watch-suspend',
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
		['jest-watch-toggle-config', { setting: 'verbose' }],
		['jest-watch-toggle-config', { setting: 'collectCoverage' }]
	]
}
