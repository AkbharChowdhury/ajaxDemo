// object assign url: https://discourse.wicg.io/t/passing-an-object-of-attributes-to-document-createelement-as-the-second-argument/809/21?page=2
// js tips for async await: https://dev.to/milindsoorya/tips-for-using-async-await-write-better-javascript-d9h

let counter = 0;
const pageTitle = _ => "text file demo using Async";
const btnTextFile = document.querySelector("#button");
const handleClick = _ => btnTextFile.addEventListener("click", _ => showContent());

const showContent = _ => {
  counter++;
  if (counter === 1) {

    // extract details from request and render the UI
    console.log(loadTextFile())
    loadTextFile().then(content => renderUI(content));

    btnTextFile.disabled = true;
  }
};

const renderUI = data => {
  let contentParagraph = createParagraph(data);
  let contentDiv = document.querySelector("#content");
  contentDiv.insertAdjacentElement("beforeend", contentParagraph);
};

const createParagraph = data => Object.assign(document.createElement("p"), {
  className: "pt-2",
  textContent: data,
});


const loadTextFile = async () => {

  try {
    const url = "sample.txt";
    // shorter syntax without error handling working properly
    // const dataObject = await(await (fetch(url).catch(e => console.error('Unable to fetch the text file. Please check the file location.')))).text(); 
    const response = await fetch(url);
    if (handleError(response)) return;
    return await response.text();

  } catch (e) {
    console.error(`There was an error fetching text file ${e.message}`);
  }
};

const handleError = (response) => {
  const errorStatus = response.status === 404;
  if (errorStatus) console.warn('could not find the specified text file location');
  return errorStatus;
};

export { loadTextFile, handleClick, pageTitle };
