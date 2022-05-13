import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/Route';
import { SecretByIdController } from './infra/rest/SecretById/SecretByIdController';
import { SecretByIdRoute } from './infra/rest/SecretById/SecretByIdRoute';
import { Secret } from './domain/models/Secret';
import { SecretRetriver } from './services/SecretRetriver';
import { UrlId } from './domain/models/UrlId';

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
