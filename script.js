const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter  = document.getElementById('filter');
let isEditMode = false;
const formBtn = itemForm.querySelector('button');

// localStorage.clear();
function displayItems() {
    const itemFromStorage = getItemFromStorage();
    itemFromStorage.forEach(item=>addItemToDom(item))
    checkUl();
}

function OnAddItemSubmit(e) {
    e.preventDefault();
    let newItem = itemInput.value;
    if( newItem === '') {
        alert('Please add an item');
        return

    }

    addItemToDom(newItem);

    addItemToStorage(newItem);

    itemInput.value = '';
    checkUl();

}

function addItemToDom(item) {
    // create list Item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    const button = createButton('remove-item btn-link text-red');
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    li.appendChild(button);

    //add item to Dom
    itemList.appendChild(li);
}


function addItemToStorage(newItem) {
    const itemFromStorage = getItemFromStorage();

    console.log(typeof(itemFromStorage));
    itemFromStorage.push(newItem);

    // console.log(typeof(JSON.stringify(itemFromStorage)));

    localStorage.setItem('items', JSON.stringify(itemFromStorage));
}

function getItemFromStorage() {
    let itemFromStorage;
    if(localStorage.getItem('items') ===null) {
        itemFromStorage = [];
    }

    else {
        // JSON.parse convert string to array
        itemFromStorage = JSON.parse(localStorage.getItem('items'));

        // console.log(typeof(itemFromStorage));
    }

    return itemFromStorage;
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon
}

function OnClickItem(e) {
    console.log(e.target);
    if(e.target.parentElement.classList.contains('remove-item')) {

        removeItem(e.target.parentElement.parentElement);
      }
    else {
        setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item'
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
    // console.log(e.target);
    if(confirm("Are you sure")) {
        // const li = e.target.parentElement.parentElement;
        item.remove();

        //remove item from local storage
        removeItemFromStorage(item.textContent);
    }
   checkUl();
}

function removeItemFromStorage(item) {
    let itemsFromStorage = getItemFromStorage();
    // Filter out the item to be removed
    itemsFromStorage = itemsFromStorage.filter(i => i !== item);
    // Store the filtered items back in local storage as a JSON string
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItem() {
    while(itemList.firstChild) {
        itemList.removeChild(itemList.firstChild);
    };
    localStorage.removeItem('items');
    // itemList.innerHTML = '';
    checkUl();
}


function checkUl() {
    // if (itemList.children.length === 0) {
    //     clearBtn.style.display = 'none';  // Hide the button when no items are present
    //     itemFilter.style.display = 'none';
    // }
    const items = itemList.querySelectorAll('li');
    // console.log(items);
    if (items.length === 0) {
        clearBtn.style.display = 'none';  // Hide the button when no items are present
        itemFilter.style.display = 'none';
    }
    else {
        clearBtn.style.display = 'block';  // Hide the button when no items are present
        itemFilter.style.display = 'block';
    }
    // console.log(itemList.children.length);
    // console.log(items.length);


}

function filterItem(e) {
    const items = itemList.querySelectorAll('li');;
    const text = e.target.value.toLowerCase();
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none';
        };
    });

}

function init() {
    itemForm.addEventListener('submit',OnAddItemSubmit);
    itemList.addEventListener('click',OnClickItem);
    clearBtn.addEventListener('click',clearItem);
    itemFilter.addEventListener('input',filterItem);


    document.addEventListener('DOMContentLoaded',displayItems);

    checkUl();
};

init();
