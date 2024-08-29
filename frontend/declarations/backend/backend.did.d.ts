import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Item {
  'id' : bigint,
  'title' : string,
  'description' : [] | [string],
}
export type Result = { 'ok' : string } |
  { 'err' : string };
export interface _SERVICE {
  'addItem' : ActorMethod<[string, [] | [string]], undefined>,
  'getAboutInfo' : ActorMethod<[], string>,
  'getItems' : ActorMethod<[], Array<Item>>,
  'getWelcomeMessage' : ActorMethod<[], string>,
  'submitContactForm' : ActorMethod<[string, string, string], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
