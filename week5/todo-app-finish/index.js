const fetcherForm = document.getElementById("fetchFormPop");
const creatorForm = document.getElementById("createForm");
const createTodoForm = document.createTodoForm;
const fetchForm = document.fetchForm;

/*
    Event Handlers
*/

document.getElementById("fetchToggleButton").addEventListener("click", (e) => {
    toggleForm(
        fetcherForm,
        document.getElementById("fetchToggleButton"),
        "Fetch Data",
        "Hide Fetch Form"
    );
});

document.getElementById("createToggleButton").addEventListener("click", (e) => {
    toggleForm(
        creatorForm,
        document.getElementById("createToggleButton"),
        "Create Todo",
        "Hide Create Form");
});

fetchForm.addEventListener("submit", (e) => {
    // Prevent default page reloading on form submission
    e.preventDefault();

    // Clear todo list from the page
    clearTodos();

    renderTodos(fetchForm.name.value);

    // Nullify the value to clear the field
    fetchForm.name.value = null;
    toggleForm(
        fetcherForm,
        document.getElementById("fetchToggleButton"),
        "Fetch Data",
        "Hide Fetch Form"
    );
});


createTodoForm.addEventListener("submit", (e) => {
    // Prevent default page reloading on form submission
    e.preventDefault();

    const data = createTodoForm;
    const completedItem = data.completed.checked;

    createTodo({
        completed: completedItem,
        title: data.title.value,
        description: data.description.value,
        imgUrl: data.imgURL.value,
        price: data.price.value
    });

    console.log({
        completed: completedItem,
        title: data.title.value,
        description: data.description.value,
        imgUrl: data.imgURL.value,
        price: data.price.value
    })

    // Nullify the value to clear the field
    createTodoForm.title.value = null;
    createTodoForm.description.value = null;
    createTodoForm.imgURL.value = null;
    createTodoForm.price.value = null;
    createTodoForm.completed.checked = null;
    toggleForm(
        creatorForm,
        document.getElementById("createToggleButton"),
        "Create Todo",
        "Hide Create Form");
});

/*
    Functions
*/

// Build re-usable function to toggle the form functionality
const toggleForm = (selectedForm, toggleButton, toggleButtonShow, toggleButtonHide) => {
    selectedForm.classList.toggle('displayForm'); 
    if(selectedForm.classList.contains('displayForm')) {
        toggleButton.textContent = toggleButtonShow; 
    } else {
        toggleButton.textContent = toggleButtonHide; 
    }
}

const clearTodos = () => {
    let items = document.getElementsByClassName("todo-item");
    // While there is still items on the page, remove all items to clear for incoming items
    while(items[0]) {
        // Always remove #0 because the next item just got pushed down to 0
        items[0].remove();
        items = document.getElementsByClassName("todo-item");
    }
}

// GET
const renderTodos = (name = "logan_johnson") => {
    axios.get(`https://api.vschool.io/${name}/todo`).then(
        res => {
            res.data.forEach(element => {
                createTodoItem(element);
            });
        }).catch(err => {
            console.log(err);
        })
}

// POST
const createTodo = (data, name = "logan_johnson") => {
    axios.post(`https://api.vschool.io/${name}/todo`, data).then(
        res => {
            // Clear, then re-render them.. Page will not refresh, Javascript removes the old ones
            clearTodos();
            renderTodos();
        }
    ).catch(err => {
        console.log(err);
    })
}

// PUT
const updateTodo = (data = {}, id = "", name = "logan_johnson") => {
    axios.put(`https://api.vschool.io/${name}/todo/${id}`, data).then(
        res => {
            clearTodos();
            renderTodos();
        }
    ).catch(err => {
        console.log(err);
    })
}

// DELETE
const deleteTodo = (id = "", name = "logan_johnson") => {
    axios.delete(`https://api.vschool.io/${name}/todo/${id}`).then(
        res => {
            clearTodos();
            renderTodos();
        }
    ).catch(err => {
        console.log(err);
    })
}

// Function to create elements for the todo list
const createTodoItem = (element) => {
    const parentContainer = document.createElement("div");
    parentContainer.classList.add("todo-item");

    const imageDiv = document.createElement("div");
    const image = document.createElement("img");
    image.src = element.imgUrl;
    imageDiv.appendChild(image);

    const containerDiv = document.createElement("div");
    containerDiv.classList.add("todo-description");

    const h2 = document.createElement("h2");
    h2.textContent = element.title;

    const description = document.createElement("p");
    description.textContent = element.description;

    const completeItemButton = document.createElement("a");
    completeItemButton.classList.add("todo-complete-button");
    completeItemButton.textContent = element.completed ? "Mark Incomplete" : "Mark Complete";
    completeItemButton.id = element._id;
    completeItemButton.href = "#";
    completeItemButton.addEventListener("click", (e) => {
        e.preventDefault();
        if(element.completed) {
            completeItemButton.textContent = "Mark Complete";
            updateTodo({completed: false}, element._id);
        } else {
            completeItemButton.textContent = "Mark Incomplete";
            updateTodo({completed: true}, element._id);
        }
    });

    const deleteButton = document.createElement("a");
    deleteButton.classList.add("todo-delete-button");
    deleteButton.href = "#";
    deleteButton.textContent = "Delete Todo Item";
    deleteButton.addEventListener("click", (e) => {
        e.preventDefault();
        deleteTodo(element._id);
    });

    const price = document.createElement("p");
    price.textContent = `Price: ${element.price}`;

    if(element.completed) {
        h2.style.textDecoration = "line-through";
        description.style.textDecoration = "line-through";
    }

    containerDiv.appendChild(h2);
    containerDiv.appendChild(price);
    containerDiv.appendChild(description);
    containerDiv.appendChild(completeItemButton);
    containerDiv.appendChild(deleteButton);

    parentContainer.appendChild(imageDiv);
    parentContainer.appendChild(containerDiv);

    document.getElementById("main").appendChild(parentContainer);
}

// Initial page load, render in the current set of todos for the default user (logan_johnson)
renderTodos();
