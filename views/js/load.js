function load(){
    const container = document.getElementById("container")
    fetch("/libs", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json()).then(data => {
        data.forEach(library => {
            const libraryDiv = document.createElement('div');
            libraryDiv.className = 'Library';

            const titleElement = document.createElement('h4');
            titleElement.id = 'Title';
            titleElement.textContent = library.Name;

            const descriptionElement = document.createElement('p');
            descriptionElement.id = 'Description';
            descriptionElement.textContent = library.Description;

            const buttonElement = document.createElement('button');
            buttonElement.id = 'Install';
            buttonElement.innerHTML = "Install";
            buttonElement.onclick = function(){
                buttonElement.innerHTML = `Enter ID ${library.ID} in the <a href="https://create.roblox.com/store/asset/18191144981">roblox plugin</a> to install`
            }

            libraryDiv.appendChild(titleElement);
            libraryDiv.appendChild(descriptionElement);
            libraryDiv.appendChild(buttonElement);

            container.appendChild(libraryDiv);
        });
    })
}

load()