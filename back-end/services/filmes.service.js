const filmes = [
    {
        id: 1,
        titulo: 'Se beber, não case! Parte II',
        genero: 'Comédia',
        imagem: 'https://lojasaraiva.vteximg.com.br/arquivos/ids/160738/1000431248.jpg?v=636968343704230000',
        nota: 10,
        assistido: false,
    },
    {
        id: 2,
        titulo: 'Liga da Justiça - Snyder Cut',
        genero: 'Ação, Ficção científica',
        imagem: 'https://br.web.img2.acsta.net/pictures/20/08/10/22/00/5069470.jpg',
        nota: 10,
        assistido: false,
    },
    {
        id: 3,
        titulo: 'Sexta-Feira 13',
        genero: 'Terror',
        imagem: 'https://br.web.img3.acsta.net/pictures/15/03/10/20/18/175541.jpg',
        nota: 10,
        assistido: false,
    }
    
]

const getFilmesService = () => {
    return filmes
} 

const getFilmesByIdService = (idParam) => {
    return filmes.find((filme) => filme.id == idParam )
}

const createFilmesService = (newFilme) => {
    const newId = filmes.length + 1
    newFilme.id = newId
    filmes.push(newFilme);
    return newFilme;
}

const updateFilmesService = (idParam, filmeEdit) => {
    const index = filmes.findIndex((filme) => filme.id == idParam);

    if(index >= 0) {
        filmes[index] = {
            ...filmes[index],
            ...filmeEdit
        }
        return true
    } else {
        return false
    }
}

const deleteFilmeService = (idParam) => {
    const index = filmes.findIndex((filme) => filme.id == idParam);
    const filmeExcluida = filmes[index];
    filmes.splice(index, 1);
    return filmeExcluida;
}

module.exports = {
    getFilmesService,
    getFilmesByIdService, 
    createFilmesService,
    updateFilmesService,
    deleteFilmeService,
};