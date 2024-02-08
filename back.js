var servidor = require('http');
var archivo = require('fs');
var mysql = require('mysql');
var url = require('url');

var conexion = mysql.createConnection({
    host: "localhost",
    user: "node",
    password: "1234",
    database: "nodejs"
});

conexion.connect(function (err) {
    if (err) throw err;
    console.log("conectado")
})

servidor.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const { pathname } = url.parse(req.url, true);

    switch (req.method) {
        case "GET":
            if (pathname === "/") {
                archivo.readFile('front.html', 'utf8', function (err, data) {
                    res.write(data);
                    res.end();
                });
            } else {
                res.end("ERROR");
            }
            break;

        case "POST":
            if (pathname === "/guardar-puntuacion") {
                let data = '';

                req.on('data', chunk => {
                    data += chunk;
                });

                req.on('end', () => {
                    try {
                        const { nombre, puntuacion } = JSON.parse(data);
                        

                        var sql = 'INSERT INTO clasificacion (nombre, puntuacion) VALUES (?, ?)';
                        var values = [nombre, puntuacion];

                        conexion.query(sql, values, (err, result) => {
                            if (err) {
                                console.error('Error al insertar');
                                res.statusCode = 500;
                                res.end(JSON.stringify({ error: 'Error interno del servidor' }));
                            } else {
                                console.log('Puntuación guardada');
                                res.end(JSON.stringify({ message: 'Puntuación guardada exitosamente' }));
                            }
                        });
                    } catch (error) {
                        console.error('Error al analizar datos JSON:');
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'Formato JSON no válido' }));
                    }
                });
            } else {
                res.end("ERROR");
            }
            break;

        default:
            res.end("ERROR");
    }

}).listen(8080);
