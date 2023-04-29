# Next.js TesloShop App

Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
* El -d, significa __detached__

## Configurar las variables de entorno
Renombrar el archivo __.env.example__ a __.env__
MongoDB URL Local:
```
MONGO_CNN_LOCAL=mongodb://localhost:27017/teslodb
```

## Reconstruir los node_modules/ y levantar Next
```
yarn install
yarn dev
```


## Llenar la base de datos con información de prueba
Llamar a:
```
  http://localhost:3000/api/seed
```
