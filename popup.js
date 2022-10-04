const form = document.querySelector(`.text-form`);
const formArea = document.querySelector(`.text-form__input`);
const block = document.querySelector(`.hidden-block`); 

const parseSnippet = (snipElement) => {
  const content = snipElement.querySelector('code').textContent;
  const configElement = snipElement.querySelector('li details ul li details');
  //const key = parameters.querySelector('summary').textContent;
  formArea.value = configElement.innerHTML
  return {
    /*key,*/
    content,
    "type": "critical",
    "config": {
      "ext": [
        "html",
        "css"
      ],
      "lang": [
        "ru"
      ],
      "profession_slug": [
        "web",
        "web-plus"
      ],
      "lesson_id": []
    }
  }
}

const parse = (html) => {
    block.innerHTML = html;
    try {
        const codeBlocks = block.querySelectorAll('details pre code');
        const snippetsElements = Array.from(codeBlocks).map(item => item.closest('ul'));
        //const snippets = snippetsElements.map(parseSnippet);
        /*formArea.value = */JSON.stringify(parseSnippet(snippetsElements[0]), null, ' ');
    } catch(e) {
        formArea.value = `Ошибка: ${e.message}`;
    }
    
    

    

    //download("snippets", JSON.stringify(commentsBlocks, null, ' '))
}

const download = (filename, text) => {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
 

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    chrome.tabs.executeScript({
        code: `document.querySelector(".page-body").innerHTML`,
    }, parse);
});

