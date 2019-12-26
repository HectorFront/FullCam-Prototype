const app = require('./src/app/app');

app.listen(app.get('port'), () =>{
  console.log(`Server on in port ${app.get('port')}`);
});