import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/Route';
import { SecretByIdController } from './infra/rest/SecretById/SecretByIdController';
import { SecretByIdRoute } from './infra/rest/SecretById/SecretByIdRoute';
import { OneTimeSecretRetriever } from './services/OneTImeSecretRetriever';
import { MongoSecretRepository } from './infra/repositories/MongoSecretRepository';
import { SecretController } from './infra/rest/Secret/SecretController';
import { SecretRoute } from './infra/rest/Secret/SecretRoute';

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretByIdController = new SecretByIdController(secretRetriever);
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const secretController = new SecretController();
const secretRoute = new SecretRoute(secretController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);
routeList.push(secretRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
