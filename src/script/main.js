import { UserController } from './controllers';
import { UserView } from './views';
import { UserModel } from './models';

const app = () => {
  new UserController(new UserModel(), new UserView());
};

app();
