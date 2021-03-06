import { template } from 'lodash'
import * as fs from 'fs-extra'
import * as pathTool from 'path'

export const templateTransfrom = async (dir, config) => {
    const paths = Object.keys(config)
    for (let path of paths) {
        const pathData = config[path]
        const fileAbsolutePath = pathTool.join(dir, ...path.split('/'))
        try {
            if (await fs.pathExists(fileAbsolutePath)) {
                const content = await fs.readFile(fileAbsolutePath, 'utf8')
                const newContent = template(content)(pathData)
                await fs.outputFile(fileAbsolutePath, newContent)
            }
        } catch (err) {
            console.error(`文件: ${fileAbsolutePath} 模板转换异常`, pathData)
            console.error(err)
        }
    }
}

