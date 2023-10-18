class ServiceCollection {
    private readonly singletonRegistry: Map<new (...args: any[]) => any, any> = new Map();
    private readonly transientRegistry: Map<new (...args: any[]) => any, (dc: ServiceCollection) => any> = new Map();

    getService<T>(dependencyType: new (...args: any[]) => T): T {
        if (this.singletonRegistry.has(dependencyType)) {
            return this.singletonRegistry.get(dependencyType);
        } else if (this.transientRegistry.has(dependencyType)) {
            return this.transientRegistry.get(dependencyType)(this);
        }
        const instance = new dependencyType();
        return instance;
    }

    addSingleton<T>(dependencyType: new (...args: any[]) => T, factory: ((dc: ServiceCollection) => T) | T) {
        if (typeof factory == "function") {
            this.singletonRegistry.set(dependencyType, (factory as (dc: ServiceCollection) => T)(this));
        } else {
            this.singletonRegistry.set(dependencyType, factory);
        }
    }

    addTransient<T>(dependencyType: new (...args: any[]) => T, factory: (dc: ServiceCollection) => T) {
        this.transientRegistry.set(dependencyType, factory);
    }
}

export default new ServiceCollection();