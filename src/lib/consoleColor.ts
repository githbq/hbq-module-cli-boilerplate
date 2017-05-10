import * as chalk from 'chalk'
import { prettyMs } from '.'
import * as ora from 'ora'
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
