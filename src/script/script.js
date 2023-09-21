async function getResponse() {
    let response = await fetch('https://countryapi.io/api/all?apikey=gDyroqqAORtV3IGsmXJvlKGZ3TfTnl9Zc3IQpRaI');
    let content = await response.json();
    
    let key;
    let countries = [];

    for(key in content) {
        countries.push(content[key].name);
    }
    countries = countries.sort();
    out(content, countries);
}

function out(content, arr) {
    let list = document.querySelector('.list');
    
    arr.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = item;
        li.addEventListener('click', function() {
            let elem = item;
            getElem(elem);
        })
        list.appendChild(li);
    })

    function getElem(el) {
        let select = document.querySelector('.select');
        let li = document.querySelectorAll('li');
        let borders = [];
        
        li.forEach(item => {
            item.classList.remove('active');
            if(item.innerHTML === el) {
                item.classList.add('active');
                item.scrollIntoView({ behavior: 'smooth' });
            }
        })
        
        for(let key in content) {
            let obj = content[key];
            if(obj.name === el) {
                if(Array.isArray(obj.borders)) {
                    select.innerHTML = '';
                    borders = obj.borders;						
                    for(let key in content) {
                        let obj2 = content[key];
                        if(borders.includes(obj2.alpha3Code)) {
                            let link = document.createElement('p');
                            link.innerHTML = `Страна: ${obj2.name}, Площадь: ${obj2.area}`;
                            link.addEventListener('click', function() {
                                let elem = obj2.name;
                                getElem(elem);
                            })
                            select.appendChild(link);
                        }
                    }
                } else {
                    select.innerHTML = `<p>${obj.name} не имеет совместных границ!</p>`;
                }
            }
        }
    }
}

getResponse();
