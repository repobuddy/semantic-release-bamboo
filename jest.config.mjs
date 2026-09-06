export default {
	preset: 'ts-jest/presets/default-esm',
	// `@semantic-release/error` and `env-ci` are ESM-only, so the suite has to run as real
	// ESM. Without this (plus NODE_OPTIONS=--experimental-vm-modules on the scripts) jest
	// loads them as CJS and dies on `Unexpected token 'export'`.
	extensionsToTreatAsEsm: ['.ts'],
	transform: {
		// The package is `"type": "module"` and the build tsconfig is nodenext, so ts-jest
		// already emits real ESM; `useESM` just tells it to keep the ESM interop helpers
		// instead of downlevelling to CJS for jest's default runtime.
		'^.+\\.tsx?$': ['ts-jest', { useESM: true }]
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
