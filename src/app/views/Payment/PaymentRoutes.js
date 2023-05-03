import { authRoles } from '../../auth/authRoles';
import PaymentGateway from './PaymentGateway';
import PaymentMethod from './PaymentMethod';
import AddPaymentGateway from './AddPaymentGateway';

const PaymentRoutes = [
  {
    path: '/payment_gateway',
    component: PaymentGateway,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/payment_gateway/add',
    component: AddPaymentGateway,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/payment_gateway/edit',
    component: PaymentGateway,
    auth: authRoles.all,
    exact: true,
  },
  {
    path: '/payment_method',
    component: PaymentMethod,
    auth: authRoles.all,
    exact: true,
  },
];

export default PaymentRoutes;
