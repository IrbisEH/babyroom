class Result:
    def __init__(self, data=None, msg=None, status=200):
        self.success = None
        self.data = data
        self.msg = msg
        self.status = status

    def get_ok(self, data=None):
        self.success = True
        self.data = data
        self.status = 200

    def get_error(self, msg=None):
        self.data = None
        self.msg = msg if msg else None
        self.status = 500

    def to_dict(self):
        return vars(self)
