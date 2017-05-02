#!/usr/bin/env node --harmony
import * as path from 'path'

console.log('path--->',path.join('adf','/fsd/fsd/f/sdf/sd')) 

let yargs = require('yargs')
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
            require('../command/init').start(argv)
        })
    .help() 
    .argv

if (!argv._.length) {
    yargs.showHelp()
}