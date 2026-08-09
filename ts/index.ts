import SRError from '@semantic-release/error'
import envCI from 'env-ci'

export interface PluginConfig {
	branch: string
	repositoryUrl: string
	ci: boolean
}

export interface Params {
	options: {
		branch: string
		repositoryUrl: string
		ci: boolean
		dryRun: boolean
	}
	logger: {
		log: (...args: any[]) => void
		error: (...args: any[]) => void
	}
}

export function verifyConditions(pluginConfig: PluginConfig, params: Params) {
	console.info('pluginConfig', pluginConfig)
	console.info('params', params)
	const env = envCI()
	console.info(env)

	if (!pluginConfig.ci) throw new SRError('not running on CI', 'EVERIFYCONDITIONS')
	if (env.service !== 'bamboo') throw new SRError('not running on bamboo', 'EVERIFYCONDITIONS')
}

// module.exports = function (pluginConfig, config, cb) {
//   var env = config.env
//   var options = config.options

//   if (options.branch !== env.bamboo_planRepository_branchName) {
//     return cb(new SRError(
//       'This test run was triggered on the branch ' + env.bamboo_planRepository_branchName +
//       ', while semantic-release is configured to only publish from ' +
//       options.branch + '.\n' +
//       'You can customize this behavior using the "branch" option: git.io/sr-options',
//       'EBRANCHMISMATCH'
//     ))
//   }

//   cb(null)
// }

// const {castArray, isPlainObject} = require('lodash');
// const SemanticReleaseError = require('@semantic-release/error');
// const execScript = require('./lib/exec-script');
// const verifyConfig = require('./lib/verify-config');

// const PLUGIN_TYPES = ['analyzeCommits', 'verifyRelease', 'generateNotes', 'publish'];
// for (const [option, value] of Object.entries(params.options || {})) {
//   if (PLUGIN_TYPES.includes(option)) {
//     for (const plugin of castArray(value)) {
//       if (
//         plugin === '@semantic-release/script' ||
//         (isPlainObject(plugin) && plugin.path === '@semantic-release/script')
//       ) {
//         verifyConfig(plugin);
//       }
//     }
//   }
// }

// verifyConfig(pluginConfig);

// // verifyConfig
// const {isString} = require('lodash');
// const SemanticReleaseError = require('@semantic-release/error');

// module.exports = config => {
//   if (!isString(config.cmd) || !config.cmd.trim()) {
//     throw new SemanticReleaseError(
//       'The script plugin must be configured with the shell command to execute in the a "cmd" option.',
//       'EINVALIDCMD'
//     );
//   }
// };
