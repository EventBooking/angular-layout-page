module LayoutPageModule {

    export interface IModule {
        config(appConfig: Function): IModule;
        run(appRun: Function): IModule;
        controller(name: string, controller: Function): IModule;
        directive(name: string, directive: any): IModule;
        filter(name: string, filter: any): IModule;
        service(name: string, service: Function): IModule;
        provider(name: string, provider: any): IModule;
        factory(name: string, factory: Function): IModule;
        constant(name: string, value: any): IModule;
    }

    export class Module implements IModule {
        private module: ng.IModule;

        constructor(name: string, modules?: string[], config?: Function) {
            this.module = angular.module(name, modules, config);
        }

        config(appConfig: Function): IModule {
            this.module.config(appConfig);
            return this;
        }

        run(appRun: Function): IModule {
            this.module.run(appRun);
            return this;
        }

        controller(name: string, controller: Function): IModule {
            this.module.controller(name, controller);
            return this;
        }

        directive(name: string, directive): IModule {
            this.module.directive(name, DirectiveFactory.create(directive));
            return this;
        }

        filter(name: string, filter): IModule {
            this.module.filter(name, FilterFactory.create(filter));
            return this;
        }

        service(name: string, service: Function): IModule {
            this.module.service(name, service);
            return this;
        }

        provider(name: string, provider): IModule {
            this.module.provider(name, provider);
            return this;
        }

        factory(name: string, factory: Function): IModule {
            this.module.factory(name, factory);
            return this;
        }

        constant(name: string, value): IModule {
            this.module.constant(name, value);
            return this;
        }
    }

    // filters
    class FilterFactory {
        static create(type: IActivatorClass): any {
            var filter = (...inject: any[]) => {
                var instance = Activator.create(type, inject);
                return (...options: any[]) => {
                    return instance.filter.apply(instance, options);
                };
            };
            filter["$inject"] = type["$inject"];
            return filter;
        }
    }

    // directives
    class DirectiveFactory {
        static create(type: IActivatorClass): any {
            var directive = (...inject: any[]) => {
                return Activator.create(type, inject);
            };
            directive["$inject"] = type["$inject"];
            return directive;
        }
    }

    // activator
    export interface IActivatorClass {
        new(...params: any[]);
    }

    class Activator {
        static create(type: IActivatorClass, params: any[]) {
            var instance = Object.create(type.prototype);
            instance.constructor.apply(instance, params);
            return instance;
        }
    }
}