window.addEventListener("load", () => 
{
    getAllBooks();
}
);
  
  const getAllBooks = () => {
    const url = "http://localhost:3002/api/books";
    fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        jwt: sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let books = data;
        books.map((book) => {
          const divBook=document.querySelector(".divBook")
          const bookElement = document.createElement("h3");
          const authElement = document.createElement("h3");
          const generElement = document.createElement("h3");
          const priceElement = document.createElement("h3");
          bookElement.innerHTML = `title:  ${book.title}`;
          authElement.innerHTML = `author:  ${book.author}`;
          generElement.innerHTML = `gener:  ${book.genre}`;
          priceElement.innerHTML = `price:  ${book.price}`;
          divBook.appendChild(bookElement)
          divBook.appendChild(authElement);
          divBook.appendChild(generElement);
          divBook.appendChild(priceElement);
        });
      });
};
  