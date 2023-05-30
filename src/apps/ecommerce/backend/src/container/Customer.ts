import { asClass, createContainer, InjectionMode } from 'awilix';
import { CustomerDelete } from 'coding-conventions-contexts-ecommerce/customer/application/Delete/CustomerDelete';
import { CustomerDeleteCommandHandler } from 'coding-conventions-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommandHandler';
import { CustomerFind } from 'coding-conventions-contexts-ecommerce/customer/application/Find/CustomerFind';
import { CustomerFindQueryHandler } from 'coding-conventions-contexts-ecommerce/customer/application/Find/CustomerFindQueryHandler';
import { CustomerRegister } from 'coding-conventions-contexts-ecommerce/customer/application/Register/CustomerRegister';
import { CustomerRegisterCommandHandler } from 'coding-conventions-contexts-ecommerce/customer/application/Register/CustomerRegisterCommandHandler';
import { LowdbCustomerRepository } from 'coding-conventions-contexts-ecommerce/customer/infrastructure/persistence/lowdb/LowdbCustomerRepository';

const container = createContainer({
	injectionMode: InjectionMode.CLASSIC
}).register({
	customerRegister: asClass(CustomerRegister),
	customerDelete: asClass(CustomerDelete),
	customerFind: asClass(CustomerFind),
	repository: asClass(LowdbCustomerRepository).singleton(),
	customerRegisterHandler: asClass(CustomerRegisterCommandHandler),
	customerDeleteHandler: asClass(CustomerDeleteCommandHandler),
	customerFindHandler: asClass(CustomerFindQueryHandler)
});

export const CustomerRegisterHandler =
	container.resolve<CustomerRegisterCommandHandler>('customerRegisterHandler');
export const CustomerDeleteHandler =
	container.resolve<CustomerDeleteCommandHandler>('customerDeleteHandler');
export const CustomerFindHandler =
	container.resolve<CustomerFindQueryHandler>('customerFindHandler');
