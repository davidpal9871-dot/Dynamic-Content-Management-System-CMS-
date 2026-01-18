// Load data from LocalStorage or initialize empty array
let contents = JSON.parse(localStorage.getItem("cmsData")) || [];
let editIndex = null;

// Add or Update Content
function addContent() {
  const titleInput = document.getElementById("title");
  const descInput = document.getElementById("desc");

  const title = titleInput.value.trim();
  const desc = descInput.value.trim();

  if (title === "" || desc === "") {
    alert("Please fill all fields");
    return;
  }

  if (editIndex === null) {
    // Add new content
    contents.push({ title, desc });
  } else {
    // Update existing content
    contents[editIndex] = { title, desc };
    editIndex = null;
  }

  // Save to LocalStorage
  localStorage.setItem("cmsData", JSON.stringify(contents));

  // Clear form
  titleInput.value = "";
  descInput.value = "";

  displayContent();
}

// Display Content Cards
function displayContent() {
  const contentList = document.getElementById("contentList");
  contentList.innerHTML = "";

  if (contents.length === 0) {
    contentList.innerHTML = "<p>No content available</p>";
    return;
  }

  contents.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <button class="edit" onclick="editContent(${index})">Edit</button>
      <button class="delete" onclick="deleteContent(${index})">Delete</button>
    `;

    contentList.appendChild(card);
  });
}

// Edit Content
function editContent(index) {
  document.getElementById("title").value = contents[index].title;
  document.getElementById("desc").value = contents[index].desc;
  editIndex = index;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Delete Content
function deleteContent(index) {
  if (confirm("Are you sure you want to delete this content?")) {
    contents.splice(index, 1);
    localStorage.setItem("cmsData", JSON.stringify(contents));
    displayContent();
  }
}

// Initial Load
displayContent();
