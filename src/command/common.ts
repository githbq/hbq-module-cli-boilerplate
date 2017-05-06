import * as  ioHelper from 'io-helper'
import { prompt } from 'prompt-promise2'
import * as  chalk from 'chalk'
import * as _ from 'lodash'
import spawn from 'spawn-helper'
import * as  stringify from 'json-stringify-pretty-compact'
import * as semver from 'semver'
/**
 * 公共属性及方法
 */
export const cwd = process.cwd()
export const rootPath = ioHelper.pathTool.join(__dirname, '..', '..')
export async function prompt(describe) {
    let value = await prompt(describe)
    return _.trim(value)
}

export const packageHelper = {
    getPath() {
        return ioHelper.pathTool.join(this.cwd || cwd, 'package.json')
    },
    get() {
        return require(this.getPath())
    },
    write(jsonObj: object) {
        return writeFile(this.getPath(), stringify(jsonObj))
    },
    //获取version
    getVersion() {
        let version = this.get().version
        if (!semver.valid(version)) {
            throw new Error('Invalid version number found in package.json, please make sure it is valid');
        }
        return [semver.major(version), semver.minor(version), semver.patch(version)].join('.');
    },
}

export function writeFile(path, content) {
    return ioHelper.writeFile(path, content)
}
export function exit() {
    process.exit()
}
export async function confirm(describe) {
    let result = await prompt(`${describe}(y/n):`)
    return result.toLowerCase().indexOf('y') != -1
}
export function exec(cmd: string, opt?: any) {
    return spawn.exec(cmd, opt)
}
export function getCurrentBranchName(opts = {}) {
    return spawn.exec('git symbolic-ref --short -q HEAD', { preventDefault: true, ...opts }).then((a, b) => {
        return a.stdout.replace(/[\n]/g, '')
    })
}
export const consoleColor = {
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
export default {
    cwd,
    rootPath,
    prompt,
    writeFile,
    exit,
    confirm,
    exec,
    getCurrentBranchName,
    consoleColor,
    stringify,
    packageHelper
}





