const filmes = [
    {
        id: 1,
        titulo: 'Guardiões da Galáxia',
        genero: 'Aventura',
        imagem: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcT1P_hV6E3_OlEq4MdFMQje5SyBUkAH0JKasP_iVJG4HMT69xn2',
        nota: 10,
        assistido: false,
    },
    {
        id: 2,
        titulo: 'Jogador N 1',
        genero: 'ação, aventura, ficção cientifica',
        imagem: 'https://img.elo7.com.br/product/original/268A830/big-poster-filme-jogador-numero-1-lo004-tamanho-90x60-cm-nerd.jpg',
        nota: 10,
        assistido: false,
    },
    {
        id: 3,
        titulo: 'Duna',
        genero: 'Ficção científica/Aventura',
        imagem: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOC8VCTSrgc4jn8tBEgZ0u1C7L40AKaniCkCpD0j2UNCJmXiVj',
        nota: 8,
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