type Constructor<T> = new (...args: any[]) => T;

class ServiceCollection {
    private readonly singletonRegistry: Map<Constructor<any>, any> = new Map();
    private readonly transientRegistry: Map<Constructor<any>, (dc: ServiceCollection) => any> = new Map();

    getService<T>(dependencyType: Constructor<T>): T {
        if (this.singletonRegistry.has(dependencyType)) {
            return this.singletonRegistry.get(dependencyType);
        } else if (this.transientRegistry.has(dependencyType)) {
            return this.transientRegistry.get(dependencyType)(this);
        }
        const instance = new dependencyType();
        return instance;
    }

    addSingleton<T>(dependencyType: new (...args: any[]) => T, factory: ((dc: ServiceCollection) => T) | T) {
        if (typeof factory === "function") {
            this.singletonRegistry.set(dependencyType, (factory as (dc: ServiceCollection) => T)(this));
        } else {
            this.singletonRegistry.set(dependencyType, factory);
        }
    }

    addSingletonWithDependencies(...constructors: Constructor<any>[]) {
        if (constructors.length > 0) {
            const [primaryConstructor, ...dependencyConstructors] = constructors;
            const parameters = dependencyConstructors.map(d => this.getService(d));
            this.singletonRegistry.set(primaryConstructor, new primaryConstructor(...parameters));
        }
    }

    addTransient<T>(dependencyType: new (...args: any[]) => T, factory: (dc: ServiceCollection) => T) {
        this.transientRegistry.set(dependencyType, factory);
    }

    addTransientWithDependencies(...constructors: Constructor<any>[]) {
        if (constructors.length > 0) {
            const [primaryConstructor, ...dependencyConstructors] = constructors;
            this.transientRegistry.set(primaryConstructor, (_) => {
                const parameters = dependencyConstructors.map(d => this.getService(d));
                return new primaryConstructor(...parameters)
            });
        }
    }
}

export default new ServiceCollection();