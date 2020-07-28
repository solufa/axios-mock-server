import minimist from 'minimist'
import { version } from '../../package.json'
import getConfig from './getConfig'
import getInputs from './getInputs'
import build from './buildRouteFile'
import write from './writeRouteFile'
import watch from './watchInputDir'

const options: minimist.Opts = {
  string: ['version', 'config', 'watch', 'baseurl'],
  alias: { v: 'version', c: 'config', w: 'watch', u: 'baseurl' }
}

export const run = (args: string[]) => {
  const argv = minimist(args, options)
  const config = getConfig(argv.config)

  ;(argv.version !== undefined
    ? () => console.log(`v${version}`)
    : argv.watch !== undefined
    ? () =>
        getInputs(config.input).forEach(input => {
          write(build(input, config, argv.baseurl))
          watch(input, () => write(build(input, config, argv.baseurl)))
        })
    : () =>
        getInputs(config.input)
          .map(input => build(input, config, argv.baseurl))
          .forEach(write))()
}
