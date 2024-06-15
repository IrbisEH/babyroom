class Result:
    def __init__(self, data=None, msg=None, status=200):
        self.data = data
        self.msg = msg
        self.status = status

    def to_dict(self):
        return vars(self)
