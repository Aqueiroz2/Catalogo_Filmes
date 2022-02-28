const apiUrl = 'http://localhost:3000'
let modoEdicao = false;
let idEdicao = 0;

const lista = document.getElementById("lista");

const getFilmes = async () => {
    const response = await fetch(`${apiUrl}/filmes/get-filmes`);
    const filmes = await response.json();

    filmes.map((filme) => {
        lista.insertAdjacentHTML("beforeend",
            `
            <div class="col">
                <div class="card shadow-sm">
                    <div class="img-banner">
                        <img src="${filme.imagem}" class="card-img-top">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${filme.titulo}</h5>
                        <span class="badge bg-dark">${filme.genero}</span>
                        <span class="badge text-dark bg-warning">Nota ${filme.nota}</span>
                    </div>
                    <tr>
                        <td>
                            <div class="card-body">
                                <button class="btn btn-outline-dark" data-bs-toggle="popover" title="Editar: Clique no Menu para pode modificar as opções" onclick="editaFilme(${filme.id})">
                                <img class="btn-edit" src="/front-end/img/edit-bg.png"></button>
                                <button class="btn btn-outline-danger" data-bs-toggle="popover" title="delete" onclick="deleteFilme(${filme.id})">
                                <img class="btn2-edit" src="/front-end/img/del.png"></button>
                                ${filme.assistido ? `<button class="btn btn-outline-warning" data-bs-toggle="popover" title="não assistido" onclick="btnSelection(${filme.id})"><img class="btn3-edit" src="/front-end/img/emo-bgr.png"></button>`:
                                    `<button class="btn btn-outline-success" data-bs-toggle="popover" title="assistido" onclick="btnSelection(${filme.id})"><img class="btn4-edit" src="/front-end/img/emo-piscando.png"></button>`}
                            </div>
                        </td>
                    </tr>
                </div>
            </div>
        
        `

        )
    })
}

getFilmes();

const submitForm = async () => {
    const titulo = document.getElementById('titulo').value;
    const genero = document.getElementById('genero').value;
    const imagem = document.getElementById('imagem').value;
    const nota = document.getElementById('nota').value;

    const filme = {
        titulo,
        genero,
        imagem,
        nota,
       
    }
    if (modoEdicao) {
        updateFilme(filme);
    } else {
        createFilme(filme);
    }
}

const createFilme = async (filme) => {

    const response = await fetch(`${apiUrl}/filmes/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    })
    const data = await response.json();
    alert(data.message);
    lista.innerHTML = '';
    getFilmes();
    limpaCampos();
}

const updateFilme = async (filme) => {

    const response = await fetch(`${apiUrl}/filmes/update/${idEdicao}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    })
    const data = await response.json();
    alert(data.message);

    lista.innerHTML = '';
    getFilmes();
    limpaCampos();

    modoEdicao = false;
    idEdicao = 0;
    }   

const editaFilme = async (id) => {

    modoEdicao = true;
    idEdicao = id;

    const filme = await getById(id);

    document.getElementById('titulo').value = filme.titulo;
    document.getElementById('genero').value = filme.genero;
    document.getElementById('imagem').value = filme.imagem;
    document.getElementById('nota').value = filme.nota;



    }

const getById = async (id) => {

    const response = await fetch(`${apiUrl}/filmes/get-by-id/${id}`)
    const filme = await response.json();
    return filme
    }


const deleteFilme = async (id) => {
    const response = await fetch(`${apiUrl}/filmes/delete/${id}`, {
        method: 'DELETE'
    })
    const result = await response.json();
    alert(result.message);

    lista.innerHTML = '';
    getFilmes();
    }

const btnSelection = async(id) =>{
    const filme = await getById(id)

    if(filme.assistido == false){
        filme.assistido = true
        console.log(filme.assistido)
    }else{
        filme.assistido = false
        console.log(filme.assistido)
    }

    const response = await fetch(`${apiUrl}/filmes/update/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(filme)
    })
    lista.innerHTML = '';
    getFilmes();
    
}

const limpaCampos = () => {
    document.getElementById('titulo').value = '';
    document.getElementById('genero').value = '';
    document.getElementById('imagem').value = '';
    document.getElementById('nota').value = '';

}





