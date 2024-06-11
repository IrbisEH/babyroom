def GetOk(data=None):
    return {
        "success": True,
        "data": data
    }


def GetError(error_code=None, error_msg=None, data=None):
    return {
        "success": False,
        "error_code": error_code,
        "error_msg": error_msg,
        "data": data
    }