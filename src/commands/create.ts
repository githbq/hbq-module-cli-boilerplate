import { consoleColor, cwd, io, rootPath, templateTransfrom, confirm, initProject } from '../utils'
import * as extract from 'extract-zip'
export default {
    /**
     * 启动
     */
    getTemplateConfig(data) {
        return {
            'package.json': { name: data.name },
        }
    },
    async start(data) {
        try {
            const { name } = data
            const dest = io.pathTool.join(cwd, name)
            let result = await this.create(dest)
            if (result === false) return
            await templateTransfrom(dest, this.getTemplateConfig(data))
            await initProject(dest)
        } catch (err) {
            consoleColor.error(err)
        }
    },
    async create(dest) {
        try {
            if (await io.fs.pathExists(dest)) {
                if (!await confirm(`路径:${dest} ,已存在是否强制覆盖`)) { return false }
            }
            await io.fs.emptyDir(dest) 
            await extract(io.pathTool.join(rootPath, 'templates', 'project.zip'), { dir: dest })
            consoleColor.green(`工程创建完成 cd ${dest}`, true)
        } catch (err) {
            console.error(err)
        }
    },
    command: ['<name>', '开始', {
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