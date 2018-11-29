import * as express from "express";
import * as app from "express/lib/application";
import { RESTfulController } from "./Controller";

Reflect.set(express, "Controller", RESTfulController);

// tslint:disable:interface-name

const RestfulMap = [
    {
        method: "GET",
        name: "index",
        path: ""
    },
    {
        method: "GET",
        name: "new",
        path: "/new"
    },
    {
        method: "GET",
        name: "show",
        path: "/:id"
    },
    {
        method: "GET",
        name: "edit",
        path: "/:id/edit"
    },
    {
        method: "POST",
        name: "create",
        path: ""
    },
    {
        method: "PUT",
        name: "update",
        path: "/:id"
    },
    {
        method: "DELETE",
        name: "destroy",
        path: "/:id"
    }
];

app.resources = <T extends typeof RESTfulController>(
    path: string,
    ...resCtrls: T[]
) => {
    const ctrls: RESTfulController[] = resCtrls.map((ctrl: any) => new ctrl());
    for (const rest of RestfulMap) {
        const handlers = ctrls.reduce(
            (arr, cur) => {
                const fn = cur[rest.name];
                if (fn && typeof fn === "function") {
                    arr.push(fn);
                }
                return arr;
            },
            [] as express.RequestHandler[]
        );
        app[rest.method.toLowerCase()](`${path}${rest.path}`, ...handlers);
    }
};

declare global {
    namespace Express {
        interface Application {
            resources<T extends typeof RESTfulController>(
                path: string,
                ...resCtrls: T[]
            ): any;
        }
    }
}

export = express;
