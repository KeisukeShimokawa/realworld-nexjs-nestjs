import { Application } from './rest/Application';
import { Route } from './rest/Route';
import { SecretByIdController } from './rest/SecretByIdController';
import { SecretByIdRoute } from './rest/SecretByIdRoute';
import { Secret } from './Secret';
import { SecretRetriver } from './SecretRetriver';
import { UrlId } from './UrlId';

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
