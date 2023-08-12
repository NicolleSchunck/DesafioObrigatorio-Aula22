let personagensFromApi = []
let personagens = document.getElementById("personagens")
let apiResults = document.getElementById("resultado")
let container = document.getElementById("container")

fetch('https://hp-api.onrender.com/api/characters/students')
  .then(res => res.json())
  .then(data => {
    personagensFromApi = data
    console.log(data);
    data.map((character, index) => {
      personagens.innerHTML += `<option value="${index}">${character.name}</option>`
    })
  })

personagens.addEventListener("change", e => {
  apiResults.innerHTML = ""
  container.innerHTML = ""
  let caracteristicas = ["name", "gender", "house", "dateOfBirth", "ancestry", "eyeColour", "hairColour", "patronus", "actor"]

  console.log("changing", e);
  let selectedChar = personagensFromApi[Number(e.target.value)]
  console.log(selectedChar)
  if (!selectedChar) {
    container.classList.add("invisible")
  }

  let image = document.createElement('img')
  image.src = selectedChar.image
  container.appendChild(image)

  let tbody = document.createElement("tbody")

  caracteristicas.map(attr => {
    let tr = document.createElement("tr")
    let th = document.createElement("th")
    let td = document.createElement("td")
    th.textContent = attr
    th.style.textTransform = "capitalize"
    if (selectedChar[attr]) {
      td.textContent = selectedChar[attr]
    }
    else {
      td.textContent = 'Desconhecido'
    }
    tbody.appendChild(tr)
    tbody.appendChild(th)
    tbody.appendChild(td)
  })
  console.log(tbody);
  apiResults.appendChild(tbody)
  container.appendChild(apiResults)
  if (apiResults) {
    container.classList.remove("invisible")
  }
})