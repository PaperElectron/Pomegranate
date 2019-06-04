import { PomegranateConfiguration } from "../Configuration";
export declare function Configure(frameworkMetrics: any, baseDirectory: string, config: PomegranateConfiguration): Promise<{
    PomConfig: any;
    FrameworkConfiguration: import("../Validation").ValidatedTransformer;
    loggerFactory: import("monet").Reader<import("../FrameworkLogger").LoggerConf, import("../FrameworkLogger").PomegranateLogger>;
    LogManager: import("../FrameworkLogger/LogManager").LogManager;
    frameworkLogger: import("../FrameworkLogger").PomegranateLogger;
    systemLogger: import("../FrameworkLogger").PomegranateLogger;
}>;
