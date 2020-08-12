const $displayArea = document.querySelector('#display-area');

const printResults = resultArr => {
  //console.log(resultArr);

  const animalHTML = resultArr.map(({ id, name, age, favoriteAnimal }) => {
    return `
  <div class="col-12 col-md-5 mb-3">
    <div class="card p-3" data-id=${id}>
      <h4 class="text-primary">${name}</h4>
      <p>Age: ${age}<br/>
      Favorite Animal: ${favoriteAnimal.substring(0, 1).toUpperCase() +
        favoriteAnimal.substring(1)}<br/>
      </p>
    </div>
  </div>
    `;
  });

  $displayArea.innerHTML = animalHTML.join('');
};

const getZookeepers = () => {
  fetch('/api/zookeepers')
  .then(response => {
    console.log(response);
    if (!response.ok) {
      return alert('Error: zookeepers database not found ' + response.statusText);
    }
    return response.json();
  })
  .then(zookeeperObj => {
    console.log(zookeeperObj);
    printResults(zookeeperObj.zookeepers);
  });
};

getZookeepers();
