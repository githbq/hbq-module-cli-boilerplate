import { consoleColor } from '../lib'
export default {
    /**
     * 启动
     */
    async start(data) {
        console.log('hello cli')
        consoleColor.start('npm run sdf atesdavdaf dfas fdas sfd')
    },
    command: ['start', '开始', {}
    ]
}