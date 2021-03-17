import * as pathTool from 'path'
import * as globby from 'globby'
import * as fs from 'fs-extra'
import { ignorePattern, cwd } from './consts'
import { exec } from './other'


export const projectHelper = {
    getProjectName(_cwd?: string) {
        return (_cwd || cwd).split(/[/\\]/).pop()
    },
    isGitProject: async (path) => {
        return fs.pathExists(pathTool.join(path, '.git'))
    },
    isNodeProject: async (path) => {
        return fs.pathExists(pathTool.join(path, 'package.json'))
    },
    findGitProjects: async (cwd, patterns = [], globOptions = {}) => {
        let paths = await globby(['**/.git/', ignorePattern, ...[].concat(patterns)], { dot: true, onlyDirectories: true, cwd, ...globOptions })
        paths = paths.map(path => pathTool.dirname(path))
        return paths
    },
    findNodeProjects: async (cwd, patterns = [], globOptions = {}) => {
        let paths = await globby(['**/package.json', ignorePattern, ...[].concat(patterns)], { dot: false, onlyDirectories: true, cwd, ...globOptions })
        paths = paths.map(path => pathTool.dirname(path))
        return paths
    },
    initProject: async (cwd) => {
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
}
