import * as requireHelper from 'require-helper'
import * as  yargs from 'yargs'
/**
 * 加载当前目录下的每一个文件，除了common文件 
 * 将每一个命令文件里面的 command属性注册到yargs
 */
export default {
    getCommands(cb?) {
        return requireHelper.requireDir(__dirname, cb, () => {

        })
    },
    start() {


        this.getCommands().forEach(({ name, result }) => {
            if (name !== 'common' && result.command) {
                /**
                 * 每一个命令文件必须有command参数 用来定义命令参数
                 */
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
