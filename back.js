var servidor = require('http');
var archivo = require('fs');
var mongoose = require('mongoose');
var mysql = require('mysql');

const conexionmongoose='mongodb://127.0.0.1/bbdd'

const formularioSchema = new mongoose.Schema({
    nombre:String,
    puntuacion:String,
    fecha:String
})

const Clasificacion = mongoose.model("Clasificacion",formularioSchema)

mongoose.connect(conexionmongoose,{useNewUrlParser:true,useUnifiedTopology:true}).then(function(){
    console.log("conectado a mongo")
    
})

var conexion = mysql.createConnection({
                host:"localhost",
                user:"node",
                password:"1234",
                database:"nodejs"
            });

conexion.connect(function(err){
                if(err) throw err;
                console.log("conectado")
 }) 

servidor.createServer(function(req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
  archivo.readFile('front.html', 'utf8', function(err, data) {
      
      res.write(data);
      res.end();
    });
 
}).listen(8080)
