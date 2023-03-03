const loadData = async (dataLimit) => {
    spinner(true);
    const url = "https://openapi.programming-hero.com/api/ai/tools";
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, dataLimit);
};

const elementById = (id) => {
    return document.getElementById(id);
};

const displayData = (allData, dataLimit) => {
    if (dataLimit && allData.length > 6) {
        allData = allData.slice(0, 6);
        seeMoreBtn.classList.remove("hidden");
    } else {
        seeMoreBtn.classList.add("hidden");
    }

    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.textContent = "";

    allData.map((data) => {
        const card = document.createElement("div");
        card.classList.add(
            "col-span-12",
            "flex",
            "justify-center",
            "md:col-span-6",
            "lg:col-span-4"
        );
        card.innerHTML = `
        <div class="w-[330px] md:w-full overflow-hidden bg-white rounded-lg shadow-lg">

                    <img class="object-cover object-center w-full h-auto md:h-56" src=${
                        data?.image
                    } alt="">               
                    <div class="px-6 py-4">
                        <div class="min-h-[125px]">
                            <h1 class="text-xl font-semibold text-gray-800">Features</h1>
                            <p>${data?.features[0] ? 1 : ""} ${
            data?.features[0] ?? ""
        }</p>
                            <p>${data?.features[1] ? 2 : ""} ${
            data?.features[1] ?? ""
        }</p>
                            <p>${data?.features[2] ? 3 : ""} ${
            data?.features[2] ?? ""
        }</p>
                            <p>${data?.features[3] ? 4 : ""} ${
            data?.features[3] ?? ""
        }</p>
                        </div>

                        <hr style="border:none; height:1px;background-color:rgba(17, 17, 17, 0.2); margin-top:15px"> 
                    <div class="flex items-center justify-between">    
                        <div>
                            <h1 class="font-bold text-xl my-3">${
                                data?.name ?? "No Title Available"
                            }</h1>
                            <p class="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"         stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>
                                ${data?.published_in ?? "No Date Available"}
                            </p>
                        </div>
                        <div>
                            <label for="my-modal-3" class="bg-[#FEF7F7] mt-4 flex items-center justify-center rounded-full w-10 h-10" onclick ="modalDetails('${
                                data?.id
                            }')">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-[#EB5757]">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>                          
                            </label>
                        </div>
                    </div>
                    </div>
                </div>
        `;
        cardsContainer.appendChild(card);
    });

    spinner(false);
    function sortByDate(a, b) {
        return (
            Number(new Date(b.published_in)) - Number(new Date(a.published_in))
        );
    }

    const sortBtn = document.getElementById("sort-btn");
    sortBtn.addEventListener("click", () => {
        cardsContainer.textContent = "";
        const sorted = allData.sort(sortByDate);
        sorted.map((data) => {
            const card = document.createElement("div");
            card.classList.add(
                "col-span-12",
                "flex",
                "justify-center",
                "md:col-span-6",
                "lg:col-span-4"
            );
            card.innerHTML = `
            <div class="w-[330px] md:w-full overflow-hidden bg-white rounded-lg shadow-lg">
    
                        <img class="object-cover object-center w-full h-auto md:h-56" src=${
                            data?.image
                        } alt="">               
                        <div class="px-6 py-4">
                            <div class="min-h-[125px]">
                                <h1 class="text-xl font-semibold text-gray-800">Features</h1>
                                <p>${data?.features[0] ? 1 : ""} ${
                data?.features[0] ?? ""
            }</p>
                                <p>${data?.features[1] ? 2 : ""} ${
                data?.features[1] ?? ""
            }</p>
                                <p>${data?.features[2] ? 3 : ""} ${
                data?.features[2] ?? ""
            }</p>
                                <p>${data?.features[3] ? 4 : ""} ${
                data?.features[3] ?? ""
            }</p>
                            </div>
    
                            <hr style="border:none; height:1px;background-color:rgba(17, 17, 17, 0.2); margin-top:15px"> 
                        <div class="flex items-center justify-between">    
                            <div>
                                <h1 class="font-bold text-xl my-3">${
                                    data?.name ?? "No Title Available"
                                }</h1>
                                <p class="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"         stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>
                                    ${data?.published_in ?? "No Date Available"}
                                </p>
                            </div>
                            <div>
                                <label for="my-modal-3" class="bg-[#FEF7F7] mt-4 flex items-center justify-center rounded-full w-10 h-10" onclick ="modalDetails('${
                                    data?.id
                                }')">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6 text-[#EB5757]">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>                          
                                </label>
                            </div>
                        </div>
                        </div>
                    </div>
            `;
            cardsContainer.appendChild(card);
        });
    });
};

const spinner = (isLoading) => {
    const spinner = document.getElementById("spinner");
    if (isLoading) {
        spinner.classList.remove("hidden");
    } else {
        spinner.classList.add("hidden");
    }
};

loadData(6);

const seeMoreBtn = elementById("see-more-btn");
seeMoreBtn.addEventListener("click", () => {
    loadData();
});

const modalDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    const modalData = data.data;
    console.log(modalData);

    // left card
    elementById("modal-desc").innerText =
        modalData?.description ?? "No description available";
    const planContainer = elementById("plan-container");
    planContainer.textContent = "";

    if (modalData.pricing === null) {
        const planEl = document.createElement("div");
        planEl.classList.add("flex", "gap-2");
        const colors = ["#03A30A", "#F28927", "#EB5757"];
        planEl.innerHTML = `
        <div class="text-[${colors[0]}] text-center rounded-xl h-[100px] flex justify-center items-center p-5 w-[130px] bg-white">
          <div>
          <p class="font-bold text-md">Free of cost</p>
          <p class="text-sm">Basic</p>
          </div> 
        </div>
        <div class="text-[${colors[1]}] text-center rounded-xl h-[100px] flex justify-center items-center p-5 w-[130px] bg-white">
          <div>
          <p class="font-bold text-md">Free of cost</p>
          <p class="text-sm">Pro</p>
          </div> 
        </div>
        <div class="text-[${colors[2]}] text-center rounded-xl h-[100px] flex justify-center items-center p-5 w-[130px] bg-white">
          <div>
          <p class="font-bold text-md">Free of cost</p>
          <p class="text-sm">Enterprise</p>
          </div> 
        </div>
        `;
        planContainer.appendChild(planEl);
    }
    modalData?.pricing?.map((price, index) => {
        const planEl = document.createElement("div");
        const colors = ["#03A30A", "#F28927", "#EB5757"];
        planEl.innerHTML = `
        <div class="text-[${
            colors[index]
        }] text-center rounded-xl h-[100px] flex justify-center items-center p-5 w-[130px] bg-white">
          <div>
          <p class="font-bold text-md">${
              price?.price === "0" ? "No Cost" : price?.price
          }</p>
          <p class="text-sm">${price?.plan}</p>
          </div> 
        </div>
        `;
        planContainer.appendChild(planEl);
    });

    const featuresDiv = elementById("features-div");
    featuresDiv.textContent = "";
    const featureListModal = document.createElement("div");
    featureListModal.innerHTML = `
        <h3 class="font-bold mb-2">Features</h3>
        <li class="text-[#585858] text-sm">${
            modalData?.features[1]?.feature_name
        }</li>
        <li class="text-[#585858] text-sm">${
            modalData?.features[2]?.feature_name
        }</li>
        <li class="text-[#585858] text-sm">${
            modalData?.features[3]?.feature_name
        }</li>
        ${
            modalData?.features[4]
                ? `<li class="text-[#585858] text-sm">${modalData?.features[4]?.feature_name}</li>`
                : ""
        }
    `;
    featuresDiv.appendChild(featureListModal);

    const integrationsDiv = elementById("integrations");
    const integrationsListModal = document.createElement("div");

    integrationsDiv.textContent = "";
    if (modalData.integrations) {
        integrationsListModal.innerHTML = `
        <h3 class="font-bold mb-2">Integrations</h3>
        ${
            modalData?.integrations[0]
                ? `<li class="text-[#585858] text-sm">${modalData?.integrations[0]}</li>`
                : ""
        }
        ${
            modalData?.integrations[1]
                ? `<li class="text-[#585858] text-sm">${modalData?.integrations[1]}</li>`
                : ""
        }
        ${
            modalData?.integrations[2]
                ? `<li class="text-[#585858] text-sm">${modalData?.integrations[2]}</li>`
                : ""
        }
        ${
            modalData?.integrations[3]
                ? `<li class="text-[#585858] text-sm">${modalData?.integrations[3]}</li>`
                : ""
        }
        ${
            modalData?.integrations[4]
                ? `<li class="text-[#585858] text-sm">${modalData?.integrations[4]}</li>`
                : ""
        }
                
            `;
    } else{
        integrationsListModal.innerHTML = `
        <h3 class="font-bold mb-2">Integrations</h3>
        <p class="text-[#585858] text-sm">No data found</p>   
        `;
    }
    
    integrationsDiv.appendChild(integrationsListModal);

    // right card
    const modalIMG = elementById("modal-image");
    modalIMG.src = modalData.image_link[0];

    const badgeContainer = elementById("badge-container");
    badgeContainer.textContent = ""
    const newDiv = document.createElement("div")
    newDiv.innerHTML = `
        ${
            modalData.accuracy.score === null
                ? ""
                : `
                <div
                    class="badge rounded-sm bg-[#EB5757] border-none absolute py-3 md:top-14 md:right-12 top-8 right-5"
                >
                    ${modalData.accuracy.score}% accuracy
                </div>
        `
        }
    `;
    badgeContainer.appendChild(newDiv)

    const faqContainer = elementById("faq-container");
    faqContainer.textContent = "";
    const faqEl = document.createElement("div");
    faqEl.innerHTML = `
        ${
            modalData.input_output_examples === null
                ? ` <div class="card-body items-center text-center">
        <h2 class="card-title">Can you give any example?</h2>
        <p class="text-[#585858]">No! Not Yet! Take a break!!!</p>
    </div>`
                : `<div class="card-body items-center text-center">
                                    <h2 class="card-title">${modalData.input_output_examples[0].input}</h2>
                                    <p class="text-[#585858]">${modalData.input_output_examples[0].output}</p>
                                </div>`
        }
        `;
    faqContainer.appendChild(faqEl);
};
