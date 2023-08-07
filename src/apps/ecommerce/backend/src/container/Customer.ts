import { asClass, createContainer, InjectionMode } from 'awilix';
import { CustomerDelete } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDelete';
import { CustomerDeleteCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Delete/CustomerDeleteCommandHandler';
import { CustomerLogin } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLogin';
import { CustomerLoginQueryHandler } from 'codexts-contexts-ecommerce/customer/application/Login/CustomerLoginQueryHandler';
import { CustomerRegister } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegister';
import { CustomerRegisterCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Register/CustomerRegisterCommandHandler';
import { CustomerUpdate } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdate';
import { CustomerUpdateCommandHandler } from 'codexts-contexts-ecommerce/customer/application/Update/CustomerUpdateCommandHandler';
import { BcryptCustomerHashing } from 'codexts-contexts-ecommerce/customer/infrastructure/cryptographic/bcrypt/BcryptCustomerHashing';
import { MongoCustomerRepository } from 'codexts-contexts-ecommerce/customer/infrastructure/persistence/mongo/MongoCustomerRepository';

const container = createContainer({
	injectionMode: InjectionMode.CLASSIC
}).register({
	customerRegister: asClass(CustomerRegister),
	customerUpdate: asClass(CustomerUpdate),
	customerDelete: asClass(CustomerDelete),
	customerLogin: asClass(CustomerLogin),
	repository: asClass(MongoCustomerRepository).singleton(),
	hashing: asClass(BcryptCustomerHashing).singleton(),
	customerRegisterHandler: asClass(CustomerRegisterCommandHandler),
	customerUpdateHandler: asClass(CustomerUpdateCommandHandler),
	customerDeleteHandler: asClass(CustomerDeleteCommandHandler),
	customerLoginHandler: asClass(CustomerLoginQueryHandler)
});

export const CustomerRegisterHandler =
	container.resolve<CustomerRegisterCommandHandler>('customerRegisterHandler');
export const CustomerUpdateHandler =
	container.resolve<CustomerUpdateCommandHandler>('customerUpdateHandler');
export const CustomerDeleteHandler =
	container.resolve<CustomerDeleteCommandHandler>('customerDeleteHandler');
export const CustomerLoginHandler =
	container.resolve<CustomerLoginQueryHandler>('customerLoginHandler');
