
    document.getElementById('search-button').addEventListener('click',()=>{
        const findFoods= document.getElementById('input-value').value;
        document.getElementById('input-value').value="";
        document.getElementById('result-area').innerHTML="";
        if(findFoods.length==1){
            
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${findFoods}`)
            .then(res=>res.json())
            .then(data=>resultShow(data.meals))
            .catch(err=>resultNotFound())
        }
        else{
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${findFoods}`)
            .then(res=>res.json())
            .then(data=>resultShow(data.meals))
            .catch(()=>resultNotFound())
    
        }
        
    })


const resultNotFound=()=>{
    const resultArea= document.getElementById('result-area');
    const foodDiv=document.createElement('div');
    foodDiv.className='result-error'
    const content=` <h4>No search food found</h4> `;
    foodDiv.innerHTML=content;
    resultArea.appendChild(foodDiv);
}


const resultShow=(foods)=>{
    foods.forEach(food => {
        const resultArea= document.getElementById('result-area');
        const foodDiv=document.createElement('div');
        foodDiv.className='meals';
        const content=` 
        <img class="food-images" src='${food.strMealThumb}'>
        <h3 class="food-title">${food.strMeal}</h3>
        `;
        foodDiv.innerHTML=content;
        resultArea.appendChild(foodDiv);   
    });
    foodDetails();
}


const foodDetails=()=>{
    const allFoods=document.getElementById('result-area');
    allFoods.addEventListener('click',(event)=>{
        if(event.target.tagName=="IMG"||event.target.tagName=="H3"){
            const clickedFoodDiv= event.target.parentNode;
            const clickedFood= clickedFoodDiv.querySelector('h3').innerText;
            ingredientsDetails(clickedFood);
        }
        else if(event.target.tagName=="DIV"){
            const clickedFoodDiv= event.target;
            const clickedFood= clickedFoodDiv.querySelector('h3').innerText;
            ingredientsDetails(clickedFood);
        }
    })
    
}


const ingredientsDetails=(clickedFood)=>{
    document.getElementById('result-area').style.display='none';
    document.getElementById('search-areas').style.display='none';
    document.getElementById('details').style.display='block';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${clickedFood}`)
            .then(res=>res.json())
            .then(data=>displayIngredients(data,clickedFood))
            
}


//display ingredients data
const displayIngredients=(data,clickedFood)=>{
    data.meals.forEach(element => {
        if(element.strMeal==clickedFood){
            document.getElementById('detail-image').setAttribute('src',element.strMealThumb);
            document.getElementById('headers').innerText=clickedFood;
            for (let i = 1; i < 10; i++) {
                const list=document.createElement('li');
                const measure= element['strMeasure'+i];
                
                const ingredient= element['strIngredient'+i];
                if(ingredient==""||ingredient==null){
                    break;
                }
                const listContent= `${measure} ${ingredient}`;
                list.innerText=listContent;
                document.getElementById('ingredients-items').appendChild(list);                         
            }
            document.getElementById('ingredient-title').innerText="Ingredients";
            
        }
    });
}



