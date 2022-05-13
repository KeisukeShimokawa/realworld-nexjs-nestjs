import { Application } from './rest/Application';
import { Route } from './rest/Route';
import { SecretByIdController } from './rest/SecretById/SecretByIdController';
import { SecretByIdRoute } from './rest/SecretById/SecretByIdRoute';
import { Secret } from './domain/Secret';
import { SecretRetriver } from './services/SecretRetriver';
import { UrlId } from './domain/UrlId';

const secretRetriver: SecretRetriver = {
  retrieveSecretById: function (urlId: UrlId): Promise<Secret> {
    throw new Error('Function not implemented.');
  },
};
const secretByIdController = new SecretByIdController(secretRetriver);
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
