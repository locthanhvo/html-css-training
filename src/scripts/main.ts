import { UserController } from '@/controllers';
import { UserModel } from '@/models';
import { UserView } from '@/views';

const app = () => {
  new UserController(new UserModel(), new UserView());
};

app();
