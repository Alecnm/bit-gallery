// Datos de ejemplo para la galería
const images = [
    {
      id: 1,
      title: "Atardecer en la playa",
      category: "naturaleza",
      src: "assets/img/img1.jpg",
      description: "Un hermoso atardecer captado en la costa del Caribe.",
      author: "Alec"
    },
    {
      id: 2,
      title: "Ciudad nocturna",
      category: "arquitectura",
      src: "assets/img/img2.jpg",
      description: "Luces y movimiento en una gran ciudad.",
      author: "María"
    },
    {
      id: 3,
      title: "Montañas nevadas",
      category: "naturaleza",
      src: "assets/img/img3.jpg",
      description: "La majestuosidad de la montaña cubierta de nieve.",
      author: "Carlos"
    },
    {
      id: 4,
      title: "Retrato artístico",
      category: "arte",
      src: "assets/img/img4.jpg",
      description: "Un retrato en blanco y negro con mucha personalidad.",
      author: "Lucía"
    }
  ];

  // ...existing code...

// Add event listener to the select element with id "filtro"
document.getElementById("filtro").addEventListener("change", function (event) {
    console.log(event.target);
  filterGallery(event.target.value);
});

// ...existing code...

  
  // FILTRAR GALERÍA
  function filterGallery(category) {
    const container = document.getElementById("galeria");
    container.innerHTML = "";
  
    const filtered = category === "todas"
      ? images
      : images.filter(img => img.category === category);
  
    filtered.forEach(img => {
      const col = document.createElement("div");
      col.className = "col-md-4 mb-4";
      col.innerHTML = `
        <img src="${img.src}" alt="${img.title}" class="img-fluid thumbnail" onclick="showDetail(${img.id})">
        <h5 class="mt-2">${img.title}</h5>
      `;
      container.appendChild(col);
    });
  }
  
  // MOSTRAR DETALLE
  function showDetail(id) {
    const img = images.find(i => i.id === id);
    if (!img) return;
  
    // Guardar info en localStorage para usar en detail.html
    localStorage.setItem("selectedImage", JSON.stringify(img));
  
    // Redirigir a la página de detalle
    window.location.href = "detail.html";
  }
  
  // CARGAR DETALLE EN detail.html
  function loadDetail() {
    const data = localStorage.getItem("selectedImage");
    if (!data) return;
  
    const img = JSON.parse(data);
  
    document.getElementById("imageDetail").innerHTML = `
      <img src="${img.src}" class="img-fluid" alt="${img.title}">
      <h2>${img.title}</h2>
      <p>${img.description}</p>
      <p><strong>Autor:</strong> ${img.author}</p>
    `;
  }
  
  // VALIDAR FORMULARIO
  function validateForm() {
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
  
    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      alert("Por favor, completa todos los campos.");
      return false;
    }
  
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email.value)) {
      alert("Por favor, ingresa un correo válido.");
      return false;
    }
  
    alert("Formulario enviado correctamente. ¡Gracias por tu mensaje!");
    return true;
  }
  