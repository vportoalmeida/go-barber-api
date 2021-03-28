import { createConnections } from 'typeorm';

createConnections().then(() => {
  console.log('📦 Connected to Database');
})
.catch(error => {
  console.log(error);
});
