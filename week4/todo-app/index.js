const toggleButton = document.getElementById("formToggle");
const formPop = document.getElementById("formPop");

// Build re-usable function to toggle the form functionality
const toggleForm = () => {
    formPop.classList.toggle('displayForm');
    if(formPop.classList.contains('displayForm')) {
        toggleButton.textContent = "Fetch Data";
    } else {
        toggleButton.textContent = "Hide Fetch Form";
    }
}

toggleButton.addEventListener("click", (e) => {
    toggleForm();
});

document.fetchForm.addEventListener("submit", (e) => {
    // Prevent default page reloading on form submission
    e.preventDefault();

    // Do something with the data
    let items = document.getElementsByClassName("todo-item");

    // While there is still items on the page, remove all items to clear for incoming items
    while(items[0]) {
        // Always remove #0 because the next item just got pushed down to 0
        items[0].remove();
        items = document.getElementsByClassName("todo-item");
    }
    console.log(items);

    renderTodos(document.fetchForm.name.value);

    // Nullify the value to clear the field
    document.fetchForm.name.value = null;
    toggleForm();
});

const renderTodos = (name = "logan_johnson") => {
    axios.get(`https://api.vschool.io/${name}/todo`).then(
        res => {
            res.data.forEach(element => {
                // console.log(res)
                createTodoItem(element);
            });
        }).catch(err => {
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
    // const completeItemButton = document.createElement("a").classList.add("todo-complete-button").textContent = "Complete Item";
    if(element.completed) {
        h2.style.textDecoration = "line-through";
        description.style.textDecoration = "line-through";
    }
    containerDiv.appendChild(h2);
    containerDiv.appendChild(description);
    // containerDiv.appendChild(completeItemButton);

    parentContainer.appendChild(imageDiv);
    parentContainer.appendChild(containerDiv);

    document.getElementById("main").appendChild(parentContainer);
}

// Initial page load, render in the current set of todos for the default user (logan_johnson)
renderTodos();
