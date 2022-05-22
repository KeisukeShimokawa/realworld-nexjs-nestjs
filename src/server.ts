import { SecretRoute } from './infra/rest/routes/SecretRoute';
import { SecretController } from './infra/rest/controllers/SecretController';
import { OneTimeSecretStorer } from './domain/services/OneTimeSecretStorer';
import { SecretByIdRoute } from './infra/rest/routes/SecretByIdRoute';
import { SecretByIdController } from './infra/rest/controllers/SecretByIdController';
import { OneTimeSecretRetriever } from './domain/services/OneTImeSecretRetriever';
import { Application } from './infra/rest/Application';
import { Route } from './infra/rest/Route';
import { UniqidTokenGenerator } from './infra/externalServices/UniqidTokenGenerator';
import { MongoSecretRepository } from './infra/repositories/mongo/MongoSecretRepository';

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);
const secretByIdController = new SecretByIdController(secretRetriever);
const secretByIdRoute = new SecretByIdRoute(secretByIdController);

const tokenGenerator = new UniqidTokenGenerator();
const oneTimeSecretStorer = new OneTimeSecretStorer(
  secretRepository,
  tokenGenerator
);
const secretController = new SecretController(oneTimeSecretStorer);
const secretRoute = new SecretRoute(secretController);

const routeList: Route[] = [];
routeList.push(secretByIdRoute);
routeList.push(secretRoute);

const application = new Application(routeList);

const expressApplication = application.getExpressApplication();

export default expressApplication;
