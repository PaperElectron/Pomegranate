"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fp_1 = require("lodash/fp");
const helpers_1 = require("../Plugin/helpers");
const PluginFiles_1 = require("../Plugin/PluginFiles");
/**
 * @file PopulateCliInjectors
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project @framework
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
exports.PopulateCliInjectors = (PluginDI, composed) => {
    let results = fp_1.map((plugin) => {
        let PluginName = helpers_1.getFqShortname(plugin);
        plugin.logger.log('Populating Child injector.');
        let ChildInjector = PluginDI.createChild();
        ChildInjector.service('Variables', plugin.runtimeVariables);
        ChildInjector.service('Logger', plugin.logger);
        if (plugin.runtimeDirectories) {
            plugin.logger.log(`Has directories, adding PluginFiles to the injector.`);
            ChildInjector.service('PluginFiles', PluginFiles_1.PluginFilesFactory(plugin.projectDirectories));
        }
        plugin.injector = ChildInjector;
        return plugin;
    }, composed);
    return results;
};
//# sourceMappingURL=PopulateCliInjectors.js.map