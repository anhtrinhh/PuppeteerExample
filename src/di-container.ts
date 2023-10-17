import Configurations from "./configurations";
import HttpClient from "./infras/http-client";
import Program from "./program";


class DIContainer {
    private dependencies: Map<any, any> = new Map();

    register<T>(dependencyClass: new (...args: any[]) => T, instance: T) {
        this.dependencies.set(dependencyClass, instance);
    }

    resolve<T>(dependencyClass: new (...args: any[]) => T): T {
        if (!this.dependencies.has(dependencyClass)) {
            throw new Error(`Dependency '${dependencyClass.name}' not registered.`);
        }

        return this.dependencies.get(dependencyClass);
    }
}

const container = new DIContainer();

container.register(Configurations, new Configurations());

container.register(HttpClient, new HttpClient());

container.register(Program, new Program());

export default container;