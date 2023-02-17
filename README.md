# Followers Control
>Find robots that are following you to gain followers!

## Requirements

* Node.js version 18 or higher installed;
* Live Server extension for VS Code installed.

# Documentation (In progress)

## Install Octokit

Install with <code>npm install octokit</code>

## Create the properties.json

```json
    {
        "login": "GITHUB_USER_NAME",
        "pages": 1,
        "users_per_page": 100
    }
```
## Load the data of the user's followers

Go to the terminal, access the directory *github-api-fetch*, and run the command <code>node fetchFollowers.js</code> to load the data.

## See the result

Run Live Server and access index.html on your browser.