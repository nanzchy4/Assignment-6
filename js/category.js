const loadCatagory = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
    .catch(error => console.log(error))

}
const displayCatagory =(data) =>{
    const catagoryContainer = document.getElementById('catagory-container');
    data.forEach(data => {
        // console.log(data);

        //showing all the news catagory
        const liItem = document.createElement('li');
        liItem.classList.add('d-md-inline','me-5')//'list-inline-item', 
        // liItem.innerText = data.category_name;
        liItem.innerHTML= `
        <span onclick="loadNews('${data.category_id}','${data.category_name}')">${data.category_name}</span
        `;
        

        catagoryContainer.appendChild(liItem);
        
    });
}

const loadNews = (catagoryId, catagoryName) =>{
    const spinElement = document.getElementById('spin');
        spinElement.classList.remove("d-none");
    // console.log(catagoryId);
    fetch(`https://openapi.programming-hero.com/api/news/category/${catagoryId}`)
    .then(res => res.json())
    .then(data => displayNews(data.data, catagoryName))
    .catch(error => console.log(error))


}

const displayNews = (data, catagoryName) => {

    const inputField = document.getElementById('item-amount');
    inputField.value = `${data.length > 0 ? data.length : "No News"}  items found for category ${catagoryName}`;

    const articleContainer = document.getElementById('article-container');
    articleContainer.innerHTML=``;
    data.forEach(data =>{
 
        const singleArticle = document.createElement('div');
        singleArticle.classList.add('col-sm-12', 'my-3');
        singleArticle.innerHTML = `
        <div class="card d-block" >
        <div class="card-body d-md-flex ">
          <div class="flex-shrink-0"> 
          <img src="${data.thumbnail_url}">   
          </div>
          <div class="flex-grow-1 ms-md-5 mt-4">
          <h5 class="card-title">${data.title}</h5>
          <p class="card-text">${data.details.length >600 ? data.details.slice(0,600).concat('...') : data.details }</p>
          <img src="${data.author ? data.author.img : ''}" class="author-img">
          
          <span class="me-md-5">${data.author.name ? data.author.name : 'Author Name Not Found'}</span>
          

          <span class="mx-md-5"><i class="fa-regular fa-eye"></i>${data.total_view ? data.total_view : 'Data Not Available'}</span>
          <span onclick="loadModal('${data._id}')" class="mx-5" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="fa-solid fa-circle-chevron-right" style="font-size:22px"></i></span>
          </div>
        </div>
      </div>
        `;
        //<span class="d-block">${data.author ? data.author.published_date : 'Date Not Found'}</span>

        articleContainer.appendChild(singleArticle);

        

    })
    // for(data of datas){
    // 
    // }
    const spinElement = document.getElementById('spin');
        spinElement.classList.add("d-none");
}

const loadModal = id =>{
    console.log(id);
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => displayModal(data.data[0]))
    .catch(error => console.log(error))
}

const displayModal = data =>{
    // console.log(data);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = `${data.author.name ? data.author.name : 'Author Name Not Found'}`;

    const newsDetails = document.getElementById('news-Details');
    newsDetails.innerHTML = `
    <p>View: ${data.total_view ? data.total_view : "Data Not Available"}</p>
    <p>Badge: ${data.rating ?  data.rating.badge : "Data Not Available"}</p>
    <p>Number: ${data.rating ?  data.rating.number : "Data Not Available"}</p>
    
    ` ;
}
loadCatagory();

