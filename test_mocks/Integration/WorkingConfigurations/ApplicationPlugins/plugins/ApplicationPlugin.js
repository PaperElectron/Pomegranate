const {strictEqual, equal, ok} = require('assert')
const {InjectablePlugin, ApplicationPlugin} = require('../../../../../Framework/Plugin/Builders')

let plugin1 = InjectablePlugin({
  variables: {},
  directories: [{prop: 'main', path: '.'}],
  configuration: {
    name: 'PomApp1',
    type: "anything",
    injectableParam: 'PomApp1',
    depends: ['PomApp2']
  },
  hooks: {
    load: (PomApp2) => {
      strictEqual(PomApp2.name, 'PomApp2')
      return {name: "PomApp1"}
    }
  },
  commands: {}
})
let plugin2 = InjectablePlugin({
  variables: {},
  directories: ['PomApp2-inner'],
  configuration: {
    name: 'PomApp2',
    type: "anything",
    injectableParam: 'PomApp2',
    depends: []
  },
  hooks: {
    load: (pa) => {
      return {name: "PomApp2"}
    }
  },
  commands: {}
})
let plugin3 = ApplicationPlugin({
  configuration: {
    name: 'PomApp3',
    type: "application",
  },
  applicationPlugins: [
    InjectablePlugin({
      variables: {},
      directories: [{prop: 'main', path: '.'}],
      configuration: {
        name: 'PomChild1',
        type: "anything",
        injectableParam: 'PomChild1',
        depends: []
      },
      hooks: {
        load: () => {
          return {name: "PomChild1"}
        }
      },
      commands: {}
    }),
    InjectablePlugin({
      variables: {name: 'PomChild2'},
      directories: [],
      configuration: {
        name: 'PomChild2',
        type: "anything",
        injectableParam: 'PomChild2',
        depends: ['PomChild1']
      },
      hooks: {
        load: (PomChild1) => {
          strictEqual(PomChild1.name, 'PomChild1')
          return {name: "PomChild2"}
        }
      },
      commands: {}
    })
  ]
})

exports.Plugin = ApplicationPlugin({
  configuration: {
    name: 'ApplicationPlugin',
    type: 'application'
  },
  applicationPlugins: [
    plugin1,
    plugin2,
    plugin3
  ]
})