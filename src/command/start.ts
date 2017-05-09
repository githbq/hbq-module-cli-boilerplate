import common from './_common'
const { exit } = common;
import * as _ from 'lodash'
export default {
    /**
     * 启动
     */
    async start(data) {
        console.log('hello cli')
        exit()
    },
    command: ['start','开始', {},
        (argv) => {
            exports.default.start(argv)
        }
    ]
}