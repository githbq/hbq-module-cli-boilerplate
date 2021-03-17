import * as semver from 'semver'
import * as pathTool from 'path'
import { rootPath } from './consts'
import { io } from './io'
import { isObject } from 'lodash'
export const packageHelper = {
    cwd: null,
    getPath(_cwd?: string) {
        return pathTool.join(_cwd || this.cwd || rootPath, 'package.json')
    },
    async get(_cwd?: string) {
        const packagePath = this.getPath(_cwd)
        if (await io.exists(packagePath)) {
            return await io.fs.readJson(packagePath)
        } else {
            return { name: 'demo1', scripts: {} }
        }
    },
    getSync(_cwd?: string) {
        const packagePath = this.getPath(_cwd)
        if (io.fs.pathExistsSync(packagePath)) {
            return require(packagePath)
        } else {
            return { name: 'demo1', scripts: {} }
        }
    },
    async write(jsonObj: object, _cwd?: string) {
        io.write(this.getPath(_cwd), jsonObj)
    },
    //获取version
    async getVersion(currentVersion?, _cwd?: string) {
        let version = currentVersion || (await this.get(rootPath)).version
        if (!semver.valid(version)) {
            throw new Error('Invalid version number found in package.json, please make sure it is valid')
        }
        return [semver.major(version), semver.minor(version), semver.patch(version)].join('.')
    },
}