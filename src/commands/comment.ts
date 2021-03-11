import { consoleColor } from '../utils'
export default {
    /**
     * 启动
     */
    async start(data) {
        console.log('hello comment',data)
    },
    command: ['<comment>','[cli] demo-2 [youComment]', {
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