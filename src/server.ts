import { Application } from './Application';
import { Route } from './Route';

const routeList: Route[] = [];

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
