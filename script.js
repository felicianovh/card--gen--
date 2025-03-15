function tambahGambar(event) {
    event.preventDefault();

    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("cardDesc").value.trim();
    let imageInput = document.getElementById("cardImage");

    if (!title || !description || imageInput.files.length == 0) {
        alert("INVALID!");
        return;
    }

    let reader = new FileReader();
    reader.onload = function(event) {
        let card = document.createElement("div");
        card.classList.add("card");
        
        let elementImage = document.createElement("img");
        elementImage.src = event.target.result;
        
        let elementTitle = document.createElement("h3");
        elementTitle.textContent = title;
        
        let elementDescription = document.createElement("p");
        elementDescription.textContent = description;

        let buttonDelete = document.createElement("button");
        buttonDelete.textContent = "Delete";
        buttonDelete.classList.add("deleteButton");
        buttonDelete.onclick = function() {
            card.remove();
        };

        let elementEdit = document.createElement("button");
        elementEdit.textContent = "Edit";
        elementEdit.classList.add("editButton");
        elementEdit.onclick = buttonEdit;

        let listButton = document.createElement("div");
        listButton.classList.add("tombol");
        listButton.appendChild(elementEdit);
        listButton.appendChild(buttonDelete);

        let editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.value = elementTitle.textContent;
        editTitle.classList.add("editTitle");

        let editDescription = document.createElement("textarea");
        editDescription.value = elementDescription.textContent;
        editDescription.classList.add("editDescription");

        function buttonEdit() {
            card.replaceChild(editTitle, elementTitle);
            card.replaceChild(editDescription, elementDescription);

            elementEdit.textContent = "Save";
            elementEdit.onclick = buttonSave;
        }

        function buttonSave () {
            elementTitle.textContent = editTitle.value;
            elementDescription.textContent = editDescription.value;
            card.replaceChild(elementTitle, editTitle);
            card.replaceChild(elementDescription, editDescription);

            elementEdit.textContent = "Edit";
            elementEdit.onclick = buttonEdit;
        }

        card.appendChild(elementImage);
        card.appendChild(elementTitle);
        card.appendChild(elementDescription);
        card.appendChild(listButton);
        
        document.querySelector(".card-container").appendChild(card);
    };

    reader.readAsDataURL(imageInput.files[0]);
}