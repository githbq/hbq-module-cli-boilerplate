
import { exec } from './other'
import { consoleColor } from './consoleColor' 

export const initProject = async (cwd) => {
    const cmds = [
        'git init',
        'git add . && git commit -am "init"',
        'code .'
    ] 
    for (let cmd of cmds) {
        try {
            consoleColor.start(cmd)
            await exec(cmd, { cwd })
        } catch (e) {
            consoleColor.error(e)
        }
    } 
}