const uuid = require('uuid/v4')

const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbPath = path.resolve(__dirname, '..', 'db.json')

const adapter = new FileSync(dbPath)
const db = low(adapter)

exports.init = () => db.defaults({ builds: [] }).write()

const builds = db.get('builds')
exports.addBuild = build => builds.push(build).write()
exports.getBuild = id => builds.find({ id }).value()
exports.getBuilds = () => builds.value()

