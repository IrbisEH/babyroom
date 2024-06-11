import axios from "axios";

function SessionManager()
{
    this.tokenKey = "token";
    this.token = localStorage.getItem(this.tokenKey);
}

SessionManager.prototype.Login = async function(username, password)
{
    let result = false;

    try
    {
        const response = await axios.post("http://192.168.1.72:5000/api/login", {
            username: username,
            password: password
        });

        if(response.status === 200)
        {
            if(response.data.success)
            {
                this.token = response.data.data.access_token;
                localStorage.setItem(this.tokenKey, this.token)
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
    catch (error)
    {
        console.error(error)
    }

    return result;
}

SessionManager.prototype.Logout = function()
{
    this.token = null;
    this.username = null;
    localStorage.removeItem(this.tokenKey);
}

SessionManager.prototype.CheckToken = async function()
{
    let result = false;

    try
    {
        if(this.token)
        {
            const headers = {"Authorization": `Bearer ${this.token}`};

            const response = await axios.get("http://192.168.1.72:5000/api/check_jwt", {headers})
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
        console.error(error);
    }

    return result;
}

export default SessionManager;