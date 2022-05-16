import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/Route';
import { SecretByIdController } from './infra/rest/SecretById/SecretByIdController';
import { SecretByIdRoute } from './infra/rest/SecretById/SecretByIdRoute';
import { OneTimeSecretRetriever } from './services/OneTImeSecretRetriever';
import { MongoSecretRepository } from './infra/repositories/MongoSecretRepository';

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretByIdController = new SecretByIdController(secretRetriever);
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
