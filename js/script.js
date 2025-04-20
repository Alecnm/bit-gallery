// after site load, exec scripts
window.addEventListener("load", function () {
    // Datos de ejemplo para la galería
    const images = [
      {
        id: 1,
        title: "Atardecer en la playa",
        category: "naturaleza",
        src: "assets/img/img1.jpg",
        description: "Un hermoso atardecer captado en la costa del Caribe.",
        author: "Alec",
      },
      {
        id: 2,
        title: "Ciudad nocturna",
        category: "arquitectura",
        src: "assets/img/img2.jpg",
        description: "Luces y movimiento en una gran ciudad.",
        author: "María",
      },
      {
        id: 3,
        title: "Montañas nevadas",
        category: "naturaleza",
        src: "assets/img/img3.jpg",
        description: "La majestuosidad de la montaña cubierta de nieve.",
        author: "Carlos",
      },
      {
        id: 4,
        title: "Retrato artístico",
        category: "arte",
        src: "assets/img/img4.jpg",
        description: "Un retrato en blanco y negro con mucha personalidad.",
        author: "Lucía",
      },
    ];
  
    // Mostrar detalle desde cualquier parte del sitio
    window.showDetail = function (id) {
      const img = images.find((i) => i.id === id);
      if (!img) return;
  
      // Guardar info en localStorage para usar en detail.html
      localStorage.setItem("selectedImage", JSON.stringify(img));
  
      // Redirigir a la página de detalle
      window.location.href = "detail.html";
    };
  
    // Cargar detalle solo si estamos en detail.html
    if (document.getElementById("detailImage")) {
      const data = localStorage.getItem("selectedImage");
      if (data) {
        const img = JSON.parse(data);
        document.getElementById("detailImage").src = img.src;
        document.getElementById("detailImage").alt = img.title;
        document.getElementById("imageDescription").textContent = img.description;
        document.getElementById("imageAuthor").textContent = `Autor: ${img.author}`;
      }
    }
  
    // Filtrar galería (si existe el select de filtro)
    const filtroSelect = document.getElementById("filtro");
    if (filtroSelect) {
      filtroSelect.addEventListener("change", function (event) {
        filterGallery(event.target.value);
      });
    }
  
    // Función para filtrar y mostrar imágenes
    function filterGallery(category) {
      const container = document.getElementById("galeria");
      if (!container) return;
  
      container.innerHTML = "";
  
      const filtered =
        category === "todas"
          ? images
          : images.filter((img) => img.category === category);
  
      filtered.forEach((img) => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
          <img src="${img.src}" alt="${img.title}" class="img-fluid thumbnail" onclick="showDetail(${img.id})">
          <h5 class="mt-2">${img.title}</h5>
        `;
        container.appendChild(col);
      });
    }
  
    // Validar formulario de contacto si existe
    const form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        if (validateForm()) {
          const responseDiv = document.getElementById("formResponse");
          if (responseDiv) {
            responseDiv.innerHTML = `
              <div class="alert alert-success" role="alert">
                Formulario enviado correctamente. ¡Gracias por tu mensaje!
              </div>
            `;
          }
          form.reset();
        }
      });
    }
  
    function validateForm() {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const responseDiv = document.getElementById("formResponse");
  
      if (!name || !email || !message) {
        if (responseDiv) {
          responseDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Por favor, completa todos los campos.
            </div>
          `;
        }
        return false;
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (responseDiv) {
          responseDiv.innerHTML = `
            <div class="alert alert-danger" role="alert">
              Por favor, ingresa un correo válido.
            </div>
          `;
        }
        return false;
      }
  
      return true;
    }
  });
  