import * as  pathTool from 'path'
import { prompt } from 'prompt-promise2'
import * as  chalk from 'chalk'
import * as _ from 'lodash'
import spawn from 'spawn-helper'
import * as  stringifyOrigin from 'json-stringify-pretty-compact'
import * as semver from 'semver'
import * as  prettyMsOrigin from 'pretty-ms'
import * as ora from 'ora'
import * as fs from 'fs-extra-promise'
/**
 * 公共属性及方法
 */
export const cwd = process.cwd().replace(/\\/g, '/')
export const rootPath = pathTool.join(__dirname, '..')
export async function prompt(describe) {
    let value = await prompt(describe)
    return _.trim(value)
}
export function stringify(obj, options = {}) {
    return stringifyOrigin(obj, { maxLength: 50, indent: 4, ...options })
}
/**
 * 从根节点引用文件
 */
export function requireRoot(...paths) {
    const path = pathTool.join.apply(null, [rootPath].concat(paths))
    return require(path)
}
export function requireCwd(...paths) {
    const path = pathTool.join.apply(null, [cwd].concat(paths))
    return require(path)
}
export const packageHelper = {
    getPath() {
        return pathTool.join(this.cwd || cwd, 'package.json')
    },
    get() {
        return require(this.getPath())
    },
    write(jsonObj: object) {
        return io.write(this.getPath(), jsonObj)
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
export const io = {
    pathTool,
    read(path) {
        path = pathTool.join.apply(null, [].concat(path))
        return fs.readFileAsync(path, 'utf8')
    },
    write(path, content, options: any = { fromRoot: false, fromCwd: false }) {
        path = pathTool.join.apply(null, [].concat(path))
        path = pathTool.join.apply(null, (options.fromRoot ? [rootPath] : options.fromCwd ? [cwd] : []).concat(path))//考虑多路径处理
        //对对象进行 美化格式处理
        content = _.isObject(content) ? stringify(content) : content
        return fs.outputFileAsync(path, content)
    }, delete(path) {
        path = pathTool.join.apply(null, [].concat(path))
        return fs.removeAsync(path)
    },
    exists(path) {
        path = pathTool.join.apply(null, [].concat(path))
        return fs.existsAsync(path)
    }
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
/**
 * 美化时间毫秒输出
 */
export function prettyMs(ms: number) {
    return prettyMsOrigin(ms, { verbose: true })
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
    error(e: Error) {
        this.red(e.message)
    },
    start(msg) {
        this.white(`\n\n$> 开始:${chalk.blue.bgWhite(msg)}`)
    },
    any(fn) {
        // chalk.blue.bgWhite(`✅`)
        fn && console.log(fn.call(this, chalk));
    },
    timeCache: {},
    time(key: string) {
        this.timeCache[key] = new Date().getTime()
    },
    timeEnd(key: string) {
        let now: number = new Date().getTime()
        let startTime: number = this.timeCache[key]
        if (startTime) {
            this.green(`${key}:${prettyMs(now - startTime)}`)
        }
    },
    /**
     * 控制台显示旋转动画  返回 spinner 对象 api查看 ora库
     */
    showSpiner(msg: string | object) {
        const spinner = ora(msg).start()
        return {
            ok: spinner.succeed.bind(spinner),
            error: spinner.fail.bind(spinner),
            warn: spinner.warn.bind(spinner),
            info: spinner.info.bind(spinner),
            keep: spinner.stopAndPersist.bind(spinner),
            self: spinner
        }
    }
}

export default {
    cwd,
    rootPath,
    prompt,
    io,
    exit,
    confirm,
    exec,
    getCurrentBranchName,
    consoleColor,
    stringify,
    packageHelper,
    pathTool,
    requireRoot,
    requireCwd
}





