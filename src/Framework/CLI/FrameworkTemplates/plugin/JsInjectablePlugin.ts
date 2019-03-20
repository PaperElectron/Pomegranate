/**
 * @file TsInjectablePlugin
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project @framework
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

export const template = `// Generated by the Pomegranate cli on {{creationDate}}

const {InjectablePlugin} = require('pomegranate')

exports.Plugin = InjectablePlugin()
  .configuration({
    name: '{{name}}',
    type: '{{type}}',
    injectableParam: '{{name}}',
    depends: [],
    provides: [],
    optional: []
  })
  .variables({})
  .hooks({
    load: () => {
      return {}
    },
    start: () => {
      
    },
    stop: () => {
      
    }
  })
  .directories([])
  .commands(() => {
    
  })
  .installs()
`