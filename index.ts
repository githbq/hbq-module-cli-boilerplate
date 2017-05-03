#!/usr/bin/env node --harmony

import * as  yargs from 'yargs'
import startCommand from './command/start'

let argv = yargs
    .command('init', '初始化', {
        template: {
            alias: ['t', 'templateName'],
            default: '',
            describe: '模板'
        },
        name: {
            alias: ['n', 'projectName'],
            default: '',
            describe: '项目名称'
        }
    },
    (argv) => {
        startCommand.start(argv)
    })
    .help()
    .argv

if (!argv._.length) {
    yargs.showHelp()
}