//=========================================
//                PUERTO
//=========================================

process.env.PORT = process.env.PORT || 3000;

//=========================================
//                ENTORNO
//=========================================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=========================================
//                BDD
//=========================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//=========================================
//         Expiración del token
//=========================================

process.env.CADUCIDAD_TOKEN = 1000 * 60 * 60 * 24 * 30;

//=========================================
//         SEED del token
//=========================================

process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'este-es-el-seed-desarrollo';


//=========================================
//         Google Client ID
//=========================================

process.env.CLIENT_ID = '91205347920-43b4g4q8h8etvdbvkid0a47hv833857j.apps.googleusercontent.com';

