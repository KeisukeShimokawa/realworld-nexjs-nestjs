import { Application } from './rest/Application';
import { Route } from './rest/Route';
import { SecretByIdController } from './rest/SecretByIdController';
import { SecretByIdRoute } from './rest/SecretByIdRoute';

const secretByIdController = new SecretByIdController();
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
