document.addEventListener("DOMContentLoaded", () => {
  const likeBtn = document.querySelector(".like-btn");
  const postMedia = document.querySelector(".post-media");
  if (!likeBtn) return;

  const likesCountSpan = likeBtn.querySelector(".likes-count");
  const bookmarkBtn = document.querySelector(".bookmark-btn");

  let isLiked = false;
  let baseLikes = 1200; // Define o valor inicial de curtidas

  // Formata números grandes (ex: 1000 -> 1.0K)
  function formatLikes(num) {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  }

  // Atualiza o texto inicial
  if (likesCountSpan) {
    likesCountSpan.textContent = formatLikes(baseLikes);
  }

  // Função para Incrementar a Curtida
  function addLike() {
    if (!isLiked) {
      baseLikes++;
      isLiked = true;
      likeBtn.classList.add("liked");
    } else {
      // Se clicar na imagem novamente enquanto já curtiu, apenas incrementa
      baseLikes++;
    }

    if (likesCountSpan) {
      likesCountSpan.textContent = formatLikes(baseLikes);
    }

    // Animação visual no coração
    const svg = likeBtn.querySelector("svg");
    if (svg) {
      svg.style.transform = "scale(1.3)";
      setTimeout(() => {
        svg.style.transform = "scale(1)";
      }, 150);
    }
  }

  // Evento de clique no Botão de Coração
  likeBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (isLiked) {
      // Se já curtiu, descurte (-1)
      isLiked = false;
      baseLikes = Math.max(0, baseLikes - 1);
      likeBtn.classList.remove("liked");
      if (likesCountSpan) {
        likesCountSpan.textContent = formatLikes(baseLikes);
      }
    } else {
      // Adiciona curtida
      addLike();
    }
  });

  // Evento de clique na Imagem
  if (postMedia) {
    postMedia.addEventListener("click", (e) => {
      e.stopPropagation();
      addLike();
    });
  }

  // Evento no botão Salvar (Bookmark)
  if (bookmarkBtn) {
    let isBookmarked = false;
    bookmarkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      isBookmarked = !isBookmarked;
      bookmarkBtn.classList.toggle("bookmarked", isBookmarked);

      const svg = bookmarkBtn.querySelector("svg");
      if (svg) {
        svg.style.transform = "scale(1.2)";
        setTimeout(() => {
          svg.style.transform = "scale(1)";
        }, 150);
      }
    });
  }
});