const filmesService = require('../services/filmes.service');

const getFilmesController = (req, res) => {
    const filmes = filmesService.getFilmesService();
    res.send(filmes);
};

const getFilmesByIdController = (req, res) => {
    const id = req.params.id;
    const filmes = filmesService.getFilmesByIdService(id)
    res.send(filmes)
};

const createFilmesController = (req, res) => {
    const filme = req.body;
    console.log(filme);
    if(!req.body || !req.body.titulo || !req.body.genero || !req.body.imagem || !req.body.nota) {
        res.status(400).send({message: 'Preencha por favor todos os campos'})
        return
    }
    
    
    const newFilme = filmesService.createFilmesService(filme)
    if(!newFilme.id) {
        res.status(500).send({message: "Ocorreu um erro, tente novamente"})
    }
    res.send({message: `Filme ${newFilme.titulo} cadastrado com sucesso`});
};

const updateFilmesController = (req, res) => {
    const idParam = req.params.id;
    const filmeEdit = req.body;
    if(!req.body || !req.body.titulo || !req.body.genero || !req.body.imagem || !req.body.nota) {
        res.status(400).send({message: 'Não foi possível editar, por favor preencha todos os campos'})
    }
    
    const edit = filmesService.updateFilmesService(idParam, filmeEdit);
    if (edit) {
        res.send({message: "Atualização dos dados do filme, realizado com sucesso" })
    } else {
        res.status(404).send({message: "ID especifcado não foi encontrado no filme"})
    }
}

const deleteFilmeController =  (req, res) => {
    const idParam =  req.params.id;
    const filmeExcluido = filmesService.deleteFilmeService(req.params.id);
    if(!filmeExcluido) {
        res.status(404).send({message: 'Não foi possível deletar o id'})
    }
    res.send({message: `Filme ${filmeExcluido.titulo} foi deletado com sucesso`});
}

module.exports = {
    getFilmesController,
    getFilmesByIdController,
    createFilmesController,
    updateFilmesController,
    deleteFilmeController,
};