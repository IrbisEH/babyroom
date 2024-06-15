export default function ApiManager()
{
    this.api = "http://127.0.0.1:5000/api";
    this.headers = {
      // "Content-Type": "text/plain;charset=UTF-8"
      "Content-Type": "application/json"
    }
}

ApiManager.prototype.SendRequest = async function(Params)
{
    const response = await fetch(`${this.api}${Params.endpoint}`, {
        method: Params.method,
        headers: this.headers,
        body: Params.data ? JSON.stringify(Params.data) : undefined,
    });

    if(response.status !== 200)
    {
        throw new Error(`Error code: ${response.statusText}`);
    }

    return response.json();
}

ApiManager.prototype.SetToken = function(Token)
{
    this.headers["Authorization"] = `Bearer ${Token}`;
}

ApiManager.prototype.RemoveToken = function()
{
    delete this.headers["Authorization"];
}