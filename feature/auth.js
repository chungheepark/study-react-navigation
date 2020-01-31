import storage from '../storage';
import genRandom from '../helper/genRandom';

export const login = async username => {
  try {
    await storage.set('username', username);
    const token = genRandom(15);
    await storage.set('token', token);
    return {username, token};
  } catch (err) {
    throw err;
  }
};

export const logout = async () => {
  try {
    await storage.remove('username');
    await storage.remove('token');
  } catch (err) {
    throw err;
  }
};

export const isLoggedIn = async () => {
  try {
    const username = await storage.get('username');
    return username && username !== '' ? true : false;
  } catch (err) {
    throw err;
  }
};
