// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Creation extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Creation entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Creation entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Creation", id.toString(), this);
  }

  static load(id: string): Creation | null {
    return store.get("Creation", id) as Creation | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get creator(): Bytes {
    let value = this.get("creator");
    return value.toBytes();
  }

  set creator(value: Bytes) {
    this.set("creator", Value.fromBytes(value));
  }

  get hash(): string {
    let value = this.get("hash");
    return value.toString();
  }

  set hash(value: string) {
    this.set("hash", Value.fromString(value));
  }

  get description(): string {
    let value = this.get("description");
    return value.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }
}