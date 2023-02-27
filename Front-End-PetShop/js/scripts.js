function fetchPets(){
    fetch('http://localhost:8080/pet/all')
    .then(resp => resp.json())
    .then(renderPets)
  }

const toyCollectionAll = document.getElementById('toy-collection')
function renderPets(pets) {
  toyCollectionAll.innerHTML = ""
  pets.forEach(function (pet) {
    toyCollectionAll.innerHTML += `
   <div class="card" data-id=${pet.id}>
        <h2>${pet.name}</h2>
        <img src="${pet.imageUrl}" class="toy-avatar" />
        <p>Dono Nome: ${pet.nameOwner}</p>
        <p>Email: ${pet.emailOwner}</p>
        <p>Phone: ${pet.numberOwner}</p>
        <p>Specie: ${pet.specie}</p>
        <p>Race: ${pet.race} </p>
        <p>Coat: ${pet.coatType}</p>
        <p>Height: ${pet.height}</p>
        <p>Weight: ${pet.weight}</p>
        <p>Treatment: ${pet.treatment}</p>
        <button onClick="perfectModal(${pet.id})"><i class="bi bi-pencil-fill">Modify</i></button>
        <button onClick="deleteById(${pet.id})" data-bs-toggle="modal fade" data-bs-target="#addAnimal"><i class="bi bi-x"></i>Delete</button>
   </div>
  `
  })
}
console.log(fetchPets());
renderPets(fetchPets());


function addPet(){  
  fetch('http://localhost:8080/pet/add', {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: document.getElementById("name").value,
    nameOwner: document.getElementById("nameOwner").value,
    numberOwner: document.getElementById("numberOwner").value,
    emailOwner: document.getElementById("emailOwner").value,
    specie: document.getElementById("specie").value,
    race: document.getElementById("race").value,
    imageUrl: document.getElementById("imageUrl").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    treatment: document.getElementById("treatment").value
  })
})
  .then(resp => console.log(resp.json()))
  .then(getPets)
}

function perfectModal(id){
  fetch(`http://localhost:8080/pet/find/${id}`)
  .then((response) => response.json())
  .then((pet) => {
    document.getElementById("name").value = pet.name;
    document.getElementById("numberOwner").value = pet.numberOwner;
    document.getElementById("emailOwner").value = pet.emailOwner;
    document.getElementById("nameOwner").value = pet.nameOwener;
    document.getElementById("specie").value = pet.specie
    document.getElementById("race").value = pet.race
    document.getElementById("height").value = pet.height
    document.getElementById("weight").value = pet.weight
    document.getElementById("imageUrl").value = pet.imageUrl
    document.getElementById("treatment").value = pet.treatment
    document.getElementById("putpet").setAttribute(onClick, `editById('${pet.id}')`)
  })
}

function editById(id){
  fetch(`http://localhost:8080/pet/update"`, {
      method: 'PUT',
      headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: id,
    name: document.getElementById("name").value,
    nameOwner: document.getElementById("nameOwner").value,
    numberOwner: document.getElementById("numberOwner").value,
    emailOwner: document.getElementById("emailOwner").value,
    specie: document.getElementById("specie").value,
    race: document.getElementById("race").value,
    imageUrl: document.getElementById("imageUrl").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    treatment: document.getElementById("treatment").value
  })
})
  .then(resp => console.log(resp.json()))
  .then(getAnimals)
}

function deleteById(id){
  fetch(`http://localhost:8080/pet/delete/${id}`, {
      method: 'DELETE'
  })
  .then(response => response.json())
  .then(getAnimals)
}