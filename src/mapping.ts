import { BigInt } from '@graphprotocol/graph-ts';
import {
  Contract,
  Created,
  NewOrder,
  OwnershipTransferred,
  Payment,
  PaymentContractChanged,
  Purchased,
  RoleGranted,
  RoleRevoked,
} from '../generated/Contract/Contract';
import { Creation, Order } from '../generated/schema';
import { convertEthToDecimal } from './helpers';

export function handleCreated(event: Created): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = new Creation(event.params.id.toHex());

  // Entity fields can be set based on event parameters
  entity.creator = event.params.creator;
  entity.hash = event.params.hash;
  entity.metadataHash = event.params.metadataHash;
  entity.price = convertEthToDecimal(event.params.price);

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.DEFAULT_ADMIN_ROLE(...)
  // - contract.MINTER_ROLE(...)
  // - contract.commission(...)
  // - contract.creations(...)
  // - contract.getRoleAdmin(...)
  // - contract.getRoleMember(...)
  // - contract.getRoleMemberCount(...)
  // - contract.hasRole(...)
  // - contract.minPrice(...)
  // - contract.nftContract(...)
  // - contract.numCreations(...)
  // - contract.owner(...)
  // - contract.paymentContract(...)
}

export function handleNewOrder(event: NewOrder): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handlePayment(event: Payment): void {
  let entity = new Order(event.params.orderId.toHex());
  let contract = Contract.bind(event.address);
  let contractOrder = contract.orders(event.params.orderId);

  entity.creation = contractOrder.value1.toHex();
  entity.buyer = contractOrder.value2;
  entity.recipient = contractOrder.value3;

  // Entities can be written to the store with `.save()`
  entity.save();
}

export function handlePaymentContractChanged(
  event: PaymentContractChanged
): void {}

export function handlePurchased(event: Purchased): void {}

export function handleRoleGranted(event: RoleGranted): void {}

export function handleRoleRevoked(event: RoleRevoked): void {}
