import * as express from "express";

export interface IRESTful {
    index?: express.RequestHandler;
    new?: express.RequestHandler;
    show?: express.RequestHandler;
    edit?: express.RequestHandler;
    create?: express.RequestHandler;
    update?: express.RequestHandler;
    destroy?: express.RequestHandler;
}

export abstract class RESTfulController implements IRESTful {
    public index?: express.RequestHandler;
    public new?: express.RequestHandler;
    public show?: express.RequestHandler;
    public edit?: express.RequestHandler;
    public create?: express.RequestHandler;
    public update?: express.RequestHandler;
    public destroy?: express.RequestHandler;
}

declare module "express" {
    const Controller: typeof RESTfulController;
}
