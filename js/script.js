  const addItems = document.querySelector('.add-items');
  const removeItems = document.querySelector('.remove-items');
  const buttons = document.querySelectorAll('.button');
  const itemsList = document.querySelector('.beers');
  const items = JSON.parse(localStorage.getItem('items')) || [];

  function addItem(e) {
    e.preventDefault();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
      text,
      done: false
    }
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
  }

  // Added remove function
  const removeAllItems = e => {
    e.preventDefault();
    items.splice(0);
    localStorage.setItem('items', JSON.stringify(items));
    populateList([], itemsList);
  }

  const toggleDone = e => {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
  }

  const toggleAllItems = e => {
    items.forEach((item, index, array) => {
      e.target.name === 'checkAll' ? (items[index].done = true) : (items[index].done = false);
    })
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }

  const populateList = (beers = [], beerList) => {
    beerList.innerHTML = beers.map((beer, i) => {
      return `
        <li>
          <input type="checkbox" data-index=${i} id="item${i}" ${beer.done ? 'checked' : ''} />
          <label for="item${i}">${beer.text}</label>
        </li>
      `;
    }).join('');
  }

  addItems.addEventListener('submit', addItem);
  removeItems.addEventListener('click', removeAllItems);
  itemsList.addEventListener('click', toggleDone);
  buttons.forEach((button) => button.addEventListener('click', toggleAllItems));
  
  populateList(items, itemsList);
