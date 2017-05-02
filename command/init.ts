const common = require('./common')
const {exit } = common;
export default {
    /**
     * 启动
     */
    async start(data) { 
        console.log('hello cli')
        exit()
    } 
}