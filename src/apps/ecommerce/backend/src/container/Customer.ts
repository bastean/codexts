import { asClass, createContainer, InjectionMode } from 'awilix';
import { CustomerDelete } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDelete';
import { CustomerDeleteCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommandHandler';
import { CustomerFind } from 'codexts-contexts-ecommerce/customer/application/Find/CustomerFind';
import { CustomerFindQueryHandler } from 'codexts-contexts-ecommerce/customer/application/Find/CustomerFindQueryHandler';
import { CustomerRegister } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegister';
import { CustomerRegisterCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommandHandler';
import { LowdbCustomerRepository } from 'codexts-contexts-ecommerce/customer/infrastructure/persistence/lowdb/LowdbCustomerRepository';

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
