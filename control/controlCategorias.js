var categorias = require('../modelo/categorias');
var newCategoria = new categorias();

function registrarCategoria(req, res) {
    var params = req.body;
    newCategoria = new categorias();
    newCategoria.id_user = params.id_user;
    newCategoria.titulo = params.titulo;

    if (newCategoria.id_user != null && newCategoria.titulo != null) {
        newCategoria.save()
            .then((categoriaSave) => {
                res.status(200).send({ message: 'Categoría registrada exitosamente: ' + categoriaSave });
            }).catch(error => {
                res.status(404).send({ message: 'Error al registrar la categoría' + error });
            })
    } else {
        res.status(200).send({ mesagge: 'Introduce todos los campos' });
    }
}

function obtenerCategorias(req, res) {
    var params = req.body
    var idUser = params.id_user;
    categorias.find({ id_user: idUser })
        .then(response => {
            if (!response) {
                return res.status(404).send({ message: 'Ha ocurrido un error' });
            }
            res.send(response);
        })
        .catch(error => {
            res.status(500).send({ message: 'Error al encontrar las categorías' + error });
        })

}

function actualizarCategoria(req, res) {
    var categoriaID = req.params.id;
    var updatedCategoria = req.body;

    categorias.findByIdAndUpdate(categoriaID, updatedCategoria, { new: true })
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            res.send(categoria);
        })
        .catch((error) => {
            res.status(500).send({ mesagge: 'Error al actualizar la Categoría' + error });
        });
}

function eliminarCategoria(req, res) {
    var categoriaID = req.params.id;

    categorias.findByIdAndRemove(categoriaID)
        .then((categoria) => {
            if (!categoria) {
                return res.status(404).send({ message: 'Categoría no encontrada' });
            }

            res.send({ message: 'Categoría eliminada exitosamente' });
        })
        .catch((error) => {
            res.status(500).send({ message: 'Error al eliminar la categoría' + error });
        });
}

module.exports = {
    registrarCategoria,
    obtenerCategorias,
    actualizarCategoria,
    eliminarCategoria
}