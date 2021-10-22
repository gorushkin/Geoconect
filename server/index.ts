import * as dotenv from 'dotenv';
dotenv.config();
import app from './server';
import db from './database/db';
const PORT = process.env.PORT;

const show = async () => {
  const list = await db().select('*').from('news');
  console.log('list: ', list);
};

show();

app.listen(PORT, () => {
  console.log(`app start at port ${PORT}`);
});

console.log('start');
