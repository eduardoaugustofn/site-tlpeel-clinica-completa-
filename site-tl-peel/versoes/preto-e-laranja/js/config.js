/*
  CONFIGURAÇÃO DO SITE
  --------------------
  Preencha aqui os links e os vídeos. Enquanto um campo estiver vazio (""),
  o botão correspondente mostra o aviso "ainda não configurado".

  LINKS: cole o endereço completo, por exemplo "https://www.instagram.com/usuario/".
  WhatsApp: use o formato "https://wa.me/55DDDNUMERO?text=Mensagem".

  VÍDEOS: em "src" aceita
    - um arquivo da pasta do site:  "assets/videos/apresentacao.mp4"
    - um link do YouTube ou Vimeo:  "https://www.youtube.com/watch?v=XXXXXXXXXXX"
  Em "poster" vai a imagem de capa (opcional): "assets/img/capa-apresentacao.jpg".
*/
window.SITE = {
  links: {
    whatsapp: "",
    listaEspera: "",
    instagramCurso: "",
    instagramGustavo: "https://instagram.com/drgustavonogueira",
    instagramRaquel: "https://instagram.com/draraqueliracema",
    localizacao: ""
  },

  videos: {
    // Seção "Apresentação"
    apresentacao: {
      src: "https://www.youtube.com/watch?v=mIPj3LTYVNc",
      poster: "https://i.ytimg.com/vi/mIPj3LTYVNc/hqdefault.jpg"
    },

    // Seção "Resultados e depoimentos" (vídeos na vertical)
    resultado1: {
      src: "https://www.youtube.com/watch?v=Bdr5zf5lXSE",
      poster: "https://i.ytimg.com/vi/Bdr5zf5lXSE/hqdefault.jpg"
    },
    depoimento1: {
      src: "https://www.youtube.com/watch?v=NhvzuVOiKJs",
      poster: "https://i.ytimg.com/vi/NhvzuVOiKJs/hqdefault.jpg"
    }
  }
};
