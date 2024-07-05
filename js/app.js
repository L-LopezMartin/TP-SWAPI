let containerTrajetas= document.querySelector('.containerTrajetas')

const fetchearPersonajes=()=>{
    fetch('https://swapi.dev/api/people/')
    .then(response=> response.json())
    .then(data=> {console.log("Started fetching");mostrarPersonajes(data.results)})
    .catch(error=>{
        console.log("Se produjo un error ", error)
    })
}

async function mostrarPersonajes(personajes){
    for(let personaje of personajes){
        const {name, height, gender, birth_year, homeworld, species, films} = personaje

        //Sub-fetch para buscar el nombre del planeta de origen
        let planetaNombre
        await fetch(homeworld)
        .then(response=> response.json())
        .then(data=> planetaNombre = data.name)
        .catch(error=>{
            console.log("Se produjo un error al buscar un planeta ", error)
        })

        //Sub-fetch para buscar el nombre de las especies a la que pertenece
        let especies = []
        for (let aSpecies of species){
            await fetch(aSpecies)
            .then(response=> response.json())
            .then(data=> especies.push(data.name))
            .catch(error=>{
                console.log("Se produjo un error al buscar una especie ", error)
                console.log(aSpecies)
            })
        }
        if (especies.length == 0){
            especies.push('-')
        }

        //Sub-fetch para buscar el nombre de las películas donde aparece
        let peliculas = []
        for (let film of films){
            await fetch(film)
            .then(response=> response.json())
            .then(data=> peliculas.push(data.title))
            .catch(error=>{
                console.log("Se produjo un error al buscar una película ", error)
                console.log(aSpecies)
            })
        }

        // Mostrar todos los datos obtenidos en una tarjeta de personaje
        containerTrajetas.innerHTML+=
        `<div class="card" style="width: 18rem;">
            <div class="card-header">
                ${name}
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Altura: ${height}cm</li>
                <li class="list-group-item">Género: ${gender}</li>
                <li class="list-group-item">Especie/s: ${especies.join(", ")}</li>
                <li class="list-group-item">Año de nacimiento: ${birth_year}</li>
                <li class="list-group-item">Planeta de origen: ${planetaNombre}</li>
                <li class="list-group-item">Películas donde aparece: ${peliculas.join(", ")}</li>
            </ul>
        </div>`
    }
    console.log("Finished fetching")
}

fetchearPersonajes()