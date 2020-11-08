const form = document.enterItem;

let id = 1;

const clearItems = () => {
    let items = document.getElementsByClassName("jokeItem");
    // While there is still items on the page, remove all items to clear for incoming items
    while(items[0]) {
        // Always remove #0 because the next item just got pushed down to 0
        items[0].remove();
        items = document.getElementsByClassName("jokeItem");
    }
}


// Form Handling
form.addEventListener("submit", (e) => {
    e.preventDefault();
    postItem({
        title: form.itemText.value
    });
    form.itemText.value = null;
});

// GET
async function fetchItems() {
    await axios.get("https://api.vschool.io/logans-funny-jokes/todo")
    .then(res => {
        clearItems();
        res.data.forEach(element => {
        createItem(element.title, element._id);
        });
    })
    .catch(err => {
        // Error Handling
        console.log(err);
        document.getElementById("jokes").innerHTML = "<p>An error has occured!</p>";
    })
}

fetchItems();

// DELETE
const deleteItem = (id) => {
    axios.delete(`https://api.vschool.io/logans-funny-jokes/todo/${id}`).then(
        () => {
            clearItems();
            fetchItems();
        }
    ).catch(err => {
        console.log(err);
    })
}

// PUT
const putItem = (newObject, id) => {
    axios.put(`https://api.vschool.io/logans-funny-jokes/todo/${id}`, newObject).then(
        () => {
            // console.log(newObject)
            // Clear, then re-render them.. Page will not refresh, Javascript removes the old ones
            clearItems();
            fetchItems();
        }
    ).catch(err => {
         // Error Handling
        console.log(err);
        document.getElementById("jokes").innerHTML = "<p>An error has occured!</p>";
    })
}

// POST
const postItem = (data) => {
    axios.post(`https://api.vschool.io/logans-funny-jokes/todo`, data).then(
        () => {
            // Clear, then re-render them.. Page will not refresh, Javascript removes the old ones
            clearItems();
            fetchItems();
        }
    ).catch(err => {
         // Error Handling
        console.log(err);
        document.getElementById("jokes").innerHTML = "<p>An error has occured!</p>";
    })
}

async function createItem(text, idServer) {
    id++;
    const containingDiv = document.createElement("div");
    containingDiv.classList.add("jokeItem");
    //set id from the server....
    containingDiv.id = idServer;

    const image = document.createElement("img");
    image.src = `https://picsum.photos/200/300?random=${id}`;

    containingDiv.appendChild(image);

    const caption = document.createElement("h4");
    caption.textContent = text;
    containingDiv.appendChild(caption);

    const inputForm = document.createElement("form");
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = text;
    inputField.placeholder = "Enter Caption";
    inputForm.appendChild(inputField);
    const inputButton = document.createElement("button");
    inputButton.textContent = "Edit";
    inputField.classList.add("hidden");
    inputForm.appendChild(inputButton);
    
    function toggleEditForm(input, serverID) {
        input.classList.toggle("hidden");
        input.classList == "hidden" && putItem({title: input.value}, serverID);
        // console.log(input.classList == "hidden")
    }

    inputForm.addEventListener("submit", (e) => {
        e.preventDefault();
        toggleEditForm(inputField, idServer);
    });

    containingDiv.appendChild(inputForm);


    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
        deleteItem(containingDiv.id);
        containingDiv.parentNode.removeChild(containingDiv);
    });
    containingDiv.appendChild(deleteButton);
    Promise.all([containingDiv, image]).then(() =>  {
        document.getElementById("jokes").appendChild(containingDiv);
    });
    
}
