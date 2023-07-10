import { authRoles } from '../../auth/authRoles';
import PaymentGateway from './PaymentGateway';
import PaymentMethod from './PaymentMethod';
import AddPaymentGateway from './AddPaymentGateway';
import EditPaymentGateway from './EditPaymentGateway';

const PaymentRoutes = [
  {
    path: '/payment_gateway',
    component: PaymentGateway,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: '/payment_gateway/add',
    component: AddPaymentGateway,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: '/payment_gateway/:id',
    component: EditPaymentGateway,
    auth: authRoles.adm,
    exact: true,
  },
  {
    path: '/payment_method',
    component: PaymentMethod,
    auth: authRoles.adm,
    exact: true,
  },
];

export default PaymentRoutes;
