
const jokeBtn = document.getElementById("jokeBtn");

const jokeTitle = document.getElementById("jokeTitle");
const jokeText = document.getElementById("jokeText");
const status = document.getElementById("status");

// API URL
const apiURL =
    "https://v2.jokeapi.dev/joke/Any?safe-mode&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

// Function to get a random joke
async function getJoke() {

    try {

        // Loading message
        jokeBtn.disabled = true;
        jokeBtn.innerText = "Loading...";

        status.innerText = "Fetching a new joke...";

        // Fetch data from API
        const response = await fetch(apiURL);

        // Convert response into JSON
        const data = await response.json();

        // Check for API errors
        if (!response.ok || data.error) {
            throw new Error("Unable to fetch joke");
        }

        // Check joke type
        if (data.type === "single") {

            jokeText.innerText = data.joke;

        } else {

            jokeText.innerText =
                data.setup + "\n\n" + data.delivery;

        }

        jokeTitle.innerText = "Here's your joke! 😂";

        status.innerText = "Enjoy your laugh!";

    }

    catch (error) {

        jokeTitle.innerText = "Oops!";

        jokeText.innerText =
            "Unable to load a joke. Please try again.";

        status.innerText = "Check your internet connection.";

        console.log(error);

    }

    finally {

        jokeBtn.disabled = false;
        jokeBtn.innerText = "Get New Joke 😂";

    }

}

// Button click event
jokeBtn.addEventListener("click", getJoke);
