import * as  ioHelper from 'io-helper'
import { prompt } from 'prompt-promise2'
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
        green(msg, ok?: boolean) {
            this.color('green', msg, ok)
        },
        red(msg, ok?: boolean) {
            this.color('red', msg, ok)
        },
        white(msg, ok?: boolean) {
            this.color('white', msg, ok)
        },
        any(fn) {
            // chalk.blue.bgWhite(`✅`)
            fn && console.log(fn.call(this, chalk));
        }
    }
}