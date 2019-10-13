const uuid = require('uuid/v4')

class Agent {
  #agents = []

  register = (address) => {
    if (!address) throw new Error('Agent must have an address')

    this.#agents.push({ address, builds: new Map() })
  }

  registerBuild = () => {
    const startTime = Date.now()
    const buildId = uuid()

    const agent = this.#getLeastLoadedAgent()

    agent.builds.set(buildId, startTime)

    return { id: buildId, address: agent.address }
  }

  removeBuild = buildId => {
    const stopTime = Date.now()

    const agent = this.#agents.find(agent => agent.builds.has(buildId))

    if (!agent) throw new Error('Build not found')

    agent.builds.delete(buildId)

    return { stopTime }
  }

  #getLeastLoadedAgent = () => {
    const [minAgent, ...agents] = this.#agents

    return agents.reduce((min, curr) => {
      return curr.builds.size < min.builds.size ? curr : min
    }, minAgent)
  }
}

module.exports = new Agent()
