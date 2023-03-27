window.onload = () => {
  function visualizzaCarrello() {
    const token = localStorage.getItem('token');
    return token;
  }
  visualizzaCarrello();
};
