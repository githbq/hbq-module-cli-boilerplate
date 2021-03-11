import { consoleColor } from '../utils'
export default {
    /**
     * 启动
     */
    async start(data) {
        console.log('hello demo', data)
    },
    command: ['[cli] demo', {
        // remove: {
        //     alias: ['r'],
        //     boolean: true,
        //     describe: 'describe'
        // },
        // lib: {
        //     alias: ['l'],
        //     boolean: true,
        //     default: false,
        //     describe: 'describe'
        // }
    }
    ]
}