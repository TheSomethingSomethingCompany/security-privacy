export async function fetchRequestsReceived({searchQ, searchBy}){

    const response = await fetch(`http://localhost:6969/fetchRequestsReceived/api?searchQ=${encodeURIComponent(searchQ)}&searchBy=${encodeURIComponent(searchBy)}`, {
        credentials: "include",
    });

    let resBody = await response.json(); // Retrieve response body and turn into JSON object
    console.log("[RESPONSE BODY SEARCH RESULTS]:") 
    console.log(resBody);
    return resBody;
}

export default fetchRequestsReceived;