import { User } from '../models/user';
import { Contact } from '../models/contact';

export const usersPreset: User[] = [
  {
    id: 1,
    email: 'admin@mail.com',
    password: 'adminpass',
    name: 'Local God'
  }, {
    id: 2,
    email: 'user@mail.com',
    password: 'userpass',
    name: 'John Doe'
  }, {
    id: 3,
    email: '2@2',
    password: '2',
    name: 'Dummy'
  }
];

export const contactsPreset: Contact[] = [
  {
    id: 100,
    userID: 1,
    firstName: 'admin',
    lastName: 'winter',
    email: 'awinter@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id1'
  }, {
    id: 101,
    userID: 1,
    firstName: 'admin',
    lastName: 'spring',
    email: 'aspring@mail.com',
    phone: '+7 123 321 22 22',
    other: 'VK: vk.com/id2'
  }, {
    id: 102,
    userID: 1,
    firstName: 'admin',
    lastName: 'summer',
    email: 'asummer@mail.com',
    phone: '+7 123 321 33 33',
    other: 'VK: vk.com/id3'
  }, {
    id: 103,
    userID: 1,
    firstName: 'admin',
    lastName: 'autumn',
    email: 'aautumn@mail.com',
    phone: '+7 123 321 44 44',
    other: 'VK: vk.com/id4'
  }, {
    id: 200,
    userID: 2,
    firstName: 'normal',
    lastName: 'friend',
    email: 'normal@mail.com',
    phone: '+7 (123) 888-11-11',
    other: ''
  }, {
    id: 201,
    userID: 2,
    firstName: 'typical',
    lastName: 'friend',
    email: 'typical@mail.com',
    phone: '8(528)321-45-54',
    other: 'hiding in Mexica now'
  }, {
    id: 202,
    userID: 2,
    firstName: 'usual',
    lastName: 'friend',
    email: 'usual@mail.com',
    phone: '+64 485-32-144-44',
    other: '???'
  }, {
    id: 300,
    userID: 3,
    firstName: 'test',
    lastName: '1',
    email: 'test1@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id1'
  }, {
    id: 301,
    userID: 3,
    firstName: 'test',
    lastName: '2',
    email: 'test2@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id2'
  }, {
    id: 302,
    userID: 3,
    firstName: 'test',
    lastName: '3',
    email: 'test3@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id3'
  }, {
    id: 303,
    userID: 3,
    firstName: 'test',
    lastName: '4',
    email: 'test4@mail.com',
    phone: '+7 123 321 11 11',
    other: 'VK: vk.com/id4'
  }
];