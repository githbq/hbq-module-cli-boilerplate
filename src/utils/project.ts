
import { exec } from './other'
import { consoleColor } from './consoleColor'
import * as pathTool from 'path'
import * as fs from 'fs-extra'

export const initProject = async (cwd) => {
    const cmds = [
        'git init',
        'git add . && git commit -am "init"',
        'code .',
        async () => {
            const yarnFeature = await fs.pathExists(pathTool.join(cwd, 'yarn.lock'))
            return `${yarnFeature ? 'yarn' : 'npm'} install`
        }
    ]
    for (let cmd of cmds) {
        if (typeof cmd === 'function') {
            cmd = await cmd()
        }
        await exec(cmd, { cwd }) 
    }
}