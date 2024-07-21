export default function ApiManager()
{
    this.api = "http://127.0.0.1:5001/api";
    this.headers = {};
}

ApiManager.prototype.SendRequest = async function(Params)
{
    this.SetToken(localStorage.getItem("token"));

    let headers = { ...this.headers };
    let body = Params.data;

    if (Params.data instanceof FormData) {
        body = Params.data;
    } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(Params.data);
    }

    const response = await fetch(`${this.api}${Params.endpoint}`, {
        method: Params.method,
        headers: headers,
        body: body,
    });

    if(response.status !== 200)
    {
        throw new Error(`Error code: ${response.statusText}`);
    }

    return response.json();
}

ApiManager.prototype.SetToken = function(Token)
{
    if(Token)
        this.headers["Authorization"] = `Bearer ${Token}`;
}

ApiManager.prototype.RemoveToken = function()
{
    delete this.headers["Authorization"];
}