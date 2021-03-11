import { template } from 'lodash'
import * as fs from 'fs-extra'
import * as pathTool from 'path'

export const templateTransfrom = async (dir, config) => {
    console.log('dirdirdir', dir)
    console.log('configconfig', config)
    const paths = Object.keys(config)
    for (let path of paths) {
        const pathData = config[path]
        const fileAbsolutePath = pathTool.join(dir, ...path.split('/'))
        console.log('fileAbsolutePath', fileAbsolutePath)
        if (await fs.pathExists(fileAbsolutePath)) {
            const content = await fs.readFile(fileAbsolutePath, 'utf8')
            console.log('pathData', pathData)
            const newContent = template(content)(pathData)
            console.log('newContent', newContent)
            await fs.outputFile(fileAbsolutePath, newContent)
        }
    }
}

