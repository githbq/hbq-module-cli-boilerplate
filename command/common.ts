import * as  ioHelper from 'io-helper'
import * as prompt from 'prompt-promise'
import * as  chalk from 'chalk'
import * as _ from 'lodash'
/**
 * 公共属性及方法
 */
export default {
    rootPath: ioHelper.pathTool.join(__dirname, '..'),
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
    }
}