import * as  ioHelper from 'io-helper'
import * as prompt from 'prompt-promise'
import * as  chalk from 'chalk'
import * as _ from 'lodash'
import spawn from 'spawn-helper'
/**
 * 公共属性及方法
 */
export default {
    cwd: process.cwd(),
    rootPath: ioHelper.pathTool.join(__dirname, '..', '..'),
    async prompt(describe) {
        let value = await prompt(describe)
        return _.trim(value)
    },
    async writeFile(path, content) {
        return await ioHelper.writeFile(path, content)
    },
    exit() {
        process.exit()
    },
    async confirm(describe) {
        let result = await prompt(`${describe}(y/n):`)
        return result.toLowerCase().indexOf('y') != -1
    },
    async exec(cmd: string, opt?: any) {
        return spawn.exec(cmd, opt)
    },
    console: {
        ok: ' √ ',
        no: ' × ',
        color(color, msg, ok = null) {
            var prefix = ok === null ? '' : ok === false ? this.no : this.ok;
            console.log(chalk[color](`\n ${prefix} ${msg} \n`))
        },
        green(msg) {
            this.color('green', msg)
        },
        red(msg) {
            this.color('red', msg)
        },
        white(msg) {
            this.color('white', msg)
        },
        any(fn) {
            // chalk.blue.bgWhite(`✅`)
            fn && console.log(fn.call(this, chalk));
        }
    }
}