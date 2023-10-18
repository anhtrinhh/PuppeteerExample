class DIContainer {
    private readonly singletonRegistry: Map<new (...args: any[]) => any, any> = new Map();
    private readonly transientRegistry: Map<new (...args: any[]) => any, (dc: DIContainer) => any> = new Map();

    resolve<T>(dependencyType: new (...args: any[]) => T): T {
        if (this.singletonRegistry.has(dependencyType)) {
            return this.singletonRegistry.get(dependencyType);
        } else if (this.transientRegistry.has(dependencyType)) {
            return this.transientRegistry.get(dependencyType)(this);
        }
        const instance = new dependencyType();
        return instance;
    }

    registerSingleton<T>(dependencyType: new (...args: any[]) => T, factory: ((dc: DIContainer) => T) | T) {
        if (typeof factory == "function") {
            this.singletonRegistry.set(dependencyType, (factory as (dc: DIContainer) => T)(this));
        } else {
            this.singletonRegistry.set(dependencyType, factory);
        }
    }

    registerTransient<T>(dependencyType: new (...args: any[]) => T, factory: (dc: DIContainer) => T) {
        this.transientRegistry.set(dependencyType, factory);
    }
}

export default new DIContainer();