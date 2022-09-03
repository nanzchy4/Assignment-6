const loadCatagory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category));

}
const displayCatagory =(data) =>{
    const catagoryContainer = document.getElementById('catagory-container');
    data.forEach(data => {
        const liItem = document.createElement('li');
        liItem.classList.add('d-md-inline','me-5')//'list-inline-item', 
        liItem.innerText = data.category_name;
        catagoryContainer.appendChild(liItem);
    });
}
loadCatagory();