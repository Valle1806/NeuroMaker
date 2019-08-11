import app from './app';
const puerto= 4000;

async function main(){
    await app.listen(puerto);   
    console.log('server on port',puerto);
}

main();