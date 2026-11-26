
const searchBtn = document.getElementById("searchBtn");

const countryInput = document.getElementById("countryInput");

const universityList = document.getElementById("universityList");

const status = document.getElementById("status");


// Search function

async function searchUniversities() {

    const country = countryInput.value.trim();

    // Check empty input

    if (country === "") {
        status.innerText = "Please enter a country name!";
        return;
    }

    // Clear previous results

    universityList.innerHTML = "";

    status.innerText = "Loading universities...";

    searchBtn.disabled = true;

    try {

        // API URL

        const apiURL =
            `http://universities.hipolabs.com/search?country=${encodeURIComponent(country)}`;

        // Fetch API data

        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("API request failed");
        }

        // Convert response into JSON

        const universities = await response.json();

        // Check if universities exist

        if (universities.length === 0) {

            status.innerText =
                "No universities found for this country.";

            return;
        }

        status.innerText =
            `${universities.length} universities found in ${country}.`;

        // Display universities

        universities.forEach(function(university) {

            // Create card

            const card = document.createElement("div");

            card.className = "card";

            // University name

            const name = document.createElement("h2");

            name.textContent = university.name;

            // State

            const state = document.createElement("p");

            state.textContent =
                "State: " +
                (university["state-province"] || "Not available");

            // Country

            const countryName = document.createElement("p");

            countryName.textContent =
                "Country: " + university.country;

            // Website

            const website = document.createElement("a");

            const url = university.web_pages?.[0];

            if (url) {

                website.href = url;
                website.textContent = "Visit Website";
                website.target = "_blank";
                website.rel = "noopener noreferrer";

            } else {

                website.textContent = "Website not available";

            }

            // Add elements to card

            card.appendChild(name);

            card.appendChild(state);

            card.appendChild(countryName);

            card.appendChild(website);

            // Add card to website

            universityList.appendChild(card);

        });

    }

    catch (error) {

        status.innerText =
            "Something went wrong. Please try again.";

        console.log(error);

    }

    finally {

        searchBtn.disabled = false;

    }

}


// Button click event

searchBtn.addEventListener(
    "click",
    searchUniversities
);


// Enter key support

countryInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchUniversities();
    }

});
