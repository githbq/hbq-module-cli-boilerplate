import * as requireHelper from 'require-helper'
import * as  yargs from 'yargs'
export default {
    start() {
        const commands = requireHelper.requireDir(__dirname)
        commands.forEach(({ name, result }) => {
            if (name !== 'common' && result.command) {
                yargs.command.apply(null, result.command).help()
            }
        })
        let argv = yargs.version().argv
        if (!argv._.length) {
            yargs.showHelp()
        }
        return { argv, yargs }
    }
} 
