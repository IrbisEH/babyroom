class FormDataModel:
    def __init__(self, request):
        self.request = request
        self.files = []
        self.data = {}

        if self.request.form:
            for key, value in self.request.form.items():
                self.data[key] = value

        if self.request.files:
            print(self.request.files)
