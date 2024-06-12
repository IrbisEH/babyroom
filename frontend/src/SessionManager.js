import axios from "axios";

function SessionManager()
{
    this.apiUrl = "http://192.168.1.72:5000/api/";
    this.tokenKey = "token";
    this.token = localStorage.getItem(this.tokenKey);
    this.headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }

    if(this.token)
        this.headers["Authorization"] = `Bearer ${this.token}`;
}

SessionManager.prototype.Login = function(username, token)
{
    if(username && token)
    {
        this.username = username;
        this.token = token;

        localStorage.setItem(this.tokenKey, this.token);
        this.headers["Authorization"] = `Bearer ${this.token}`;
    }
}

SessionManager.prototype.Logout = function()
{
    this.username = null;
    this.token = null;

    localStorage.removeItem(this.tokenKey);
    delete this.headers["Authorization"];
}

SessionManager.prototype.SetToken = function(token)
{
    this.token = token;

    if(this.token)
    {
        localStorage.setItem(this.tokenKey, token);
        this.headers["Authorization"] = `Bearer ${this.token}`;
    }
}

SessionManager.prototype.CheckToken = async function()
{
    let result = false;

    try
    {
        if(this.token)
        {
            const response = await axios.get("http://192.168.1.72:5000/api/check_jwt", {headers:this.headers})
                .then(response => {
                    return response;
                })

            if(response.status === 200)
            {
                if(response.data.success)
                {
                    this.username = response.data.data.username;
                    result = true;
                }
                else
                {
                    throw new Error(response.data.error_msg)
                }
            }
            else
            {
                throw new Error("Server Error");
            }

        }
    }
    catch(error)
    {
        this.Logout();
    }

    return result;
}

SessionManager.prototype.SendRequest = async function(Params)
{
    let result = {success: false};
    let response = null;

    try
    {
        let data = Params.data || {};
        response = await axios[Params.method](`${this.apiUrl}${Params.target}`, {...data}, {headers: this.headers});

        if(response.status === 200)
        {
            if(response.data.success)
            {
                result = response.data;
            }
            else
            {
                throw new Error("Server Method Error");
            }
        }
        else
        {
            throw new Error("Server Error");
        }

    }
    catch(error)
    {
       result = {
            success: false,
            error: error.message,
            response: response
        };
    }

    return result;
}



export default SessionManager;